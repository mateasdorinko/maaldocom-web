import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.hoisted(() => {
  process.env.AUTH0_DOMAIN = 'test.us.auth0.com';
  process.env.AUTH0_CLIENT_ID = 'test-client-id';
  process.env.AUTH0_CLIENT_SECRET = 'test-client-secret';
  process.env.AUTH0_AUDIENCE = 'https://test-api.example.com';
});
vi.mock('server-only', () => ({}));

import { getClientCredentialsToken, resetTokenCache } from './token';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function tokenResponse(expiresIn = 86400) {
  return {
    ok: true,
    json: () =>
      Promise.resolve({
        access_token: `token-${Math.random().toString(36).slice(2)}`,
        expires_in: expiresIn,
        token_type: 'Bearer',
      }),
  };
}

describe('getClientCredentialsToken', () => {
  beforeEach(() => {
    resetTokenCache();
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches a token from Auth0', async () => {
    mockFetch.mockResolvedValueOnce(tokenResponse());

    const token = await getClientCredentialsToken();

    expect(token).toMatch(/^token-/);
    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch).toHaveBeenCalledWith('https://test.us.auth0.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: 'test-client-id',
        client_secret: 'test-client-secret',
        audience: 'https://test-api.example.com',
      }),
    });
  });

  it('returns the cached token on subsequent calls', async () => {
    mockFetch.mockResolvedValueOnce(tokenResponse());

    const first = await getClientCredentialsToken();
    const second = await getClientCredentialsToken();

    expect(first).toBe(second);
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it('refetches when the token has expired', async () => {
    // Token that expires in 61 seconds (just above the 60s buffer)
    mockFetch.mockResolvedValueOnce(tokenResponse(61));

    const first = await getClientCredentialsToken();

    // Advance time past expiry (buffer is 60s, so 61-60=1s valid window)
    vi.useFakeTimers();
    vi.advanceTimersByTime(2000);

    mockFetch.mockResolvedValueOnce(tokenResponse());

    const second = await getClientCredentialsToken();

    expect(second).not.toBe(first);
    expect(mockFetch).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });

  it('throws when Auth0 returns an error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });

    await expect(getClientCredentialsToken()).rejects.toThrow(
      'Failed to fetch client credentials token: 401 Unauthorized',
    );
  });

  it('throws when required env vars are missing', async () => {
    const original = process.env.AUTH0_AUDIENCE;
    delete process.env.AUTH0_AUDIENCE;

    await expect(getClientCredentialsToken()).rejects.toThrow(
      'Missing Auth0 environment variables',
    );

    process.env.AUTH0_AUDIENCE = original;
  });
});
