import { describe, it, expect, vi, beforeEach } from 'vitest';

// vi.hoisted runs in the hoisted scope so mock fns exist when vi.mock factory executes.
const { mockPostMail, mockMapApiError } = vi.hoisted(() => ({
  mockPostMail: vi.fn(),
  mockMapApiError: vi.fn(),
}));

vi.mock('@/server', () => ({
  systemApi: { postMail: mockPostMail },
  mapApiError: mockMapApiError,
}));

import { POST } from './route';

function makeRequest(body: unknown): Request {
  return new Request('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── Honeypot ─────────────────────────────────────────────────────────
  it('silently succeeds when honeypot field is filled (bot trap)', async () => {
    const res = await POST(
      makeRequest({
        email: 'bot@spam.com',
        subject: 'Buy now',
        message: 'Click here',
        website: 'http://spam.example',
      }),
    );

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.message).toBe('Your message has been sent successfully.');
    // The upstream API must NOT be called
    expect(mockPostMail).not.toHaveBeenCalled();
  });

  // ── Validation ───────────────────────────────────────────────────────
  it('returns 400 with field errors when all required fields are empty', async () => {
    const res = await POST(makeRequest({}));

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.errors.email).toEqual(['Email is required.']);
    expect(json.errors.subject).toEqual(['Subject is required.']);
    expect(json.errors.message).toEqual(['Message is required.']);
    expect(mockPostMail).not.toHaveBeenCalled();
  });

  it('returns 400 when only email is missing', async () => {
    const res = await POST(makeRequest({ subject: 'Hello', message: 'World' }));

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.errors.email).toEqual(['Email is required.']);
    expect(json.errors).not.toHaveProperty('subject');
    expect(json.errors).not.toHaveProperty('message');
  });

  it('treats whitespace-only values as missing', async () => {
    const res = await POST(makeRequest({ email: '  ', subject: '\t', message: '\n' }));

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(Object.keys(json.errors)).toEqual(
      expect.arrayContaining(['email', 'subject', 'message']),
    );
  });

  // ── Success ──────────────────────────────────────────────────────────
  it('forwards trimmed fields to upstream API and returns 200', async () => {
    mockPostMail.mockResolvedValue(undefined);

    const res = await POST(
      makeRequest({
        email: '  user@example.com  ',
        subject: '  Hi there  ',
        message: '  Some message  ',
      }),
    );

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.message).toBe('Your message has been sent successfully.');

    // Verify the mapping: form fields → PostMailRequest (email→from, message→body)
    expect(mockPostMail).toHaveBeenCalledWith({
      from: 'user@example.com',
      subject: 'Hi there',
      body: 'Some message',
    });
  });

  // ── Upstream error ───────────────────────────────────────────────────
  it('delegates upstream errors through mapApiError', async () => {
    const upstreamError = new Error('network failure');
    mockPostMail.mockRejectedValue(upstreamError);
    mockMapApiError.mockReturnValue({
      status: 502,
      body: { message: 'Bad gateway' },
    });

    const res = await POST(
      makeRequest({
        email: 'user@example.com',
        subject: 'Hi',
        message: 'Hello',
      }),
    );

    expect(res.status).toBe(502);
    expect(mockMapApiError).toHaveBeenCalledWith(upstreamError);
  });

  // ── Cache headers ────────────────────────────────────────────────────
  it('sets Cache-Control: no-store on every response', async () => {
    // Success
    mockPostMail.mockResolvedValue(undefined);
    const ok = await POST(
      makeRequest({
        email: 'a@b.com',
        subject: 's',
        message: 'm',
      }),
    );
    expect(ok.headers.get('Cache-Control')).toBe('no-store');

    // Validation error
    const bad = await POST(makeRequest({}));
    expect(bad.headers.get('Cache-Control')).toBe('no-store');
  });
});
