import { describe, it, expect, vi } from 'vitest';
import { AxiosError, type AxiosResponse } from 'axios';

// Must run before the module-level `import 'server-only'` and env check.
vi.hoisted(() => {
  process.env.API_BASE_URL = 'http://test-api.example.com';
});
vi.mock('server-only', () => ({}));
vi.mock('./token', () => ({
  getClientCredentialsToken: vi.fn().mockResolvedValue('test-access-token'),
}));

import { mapApiError, authenticatedApiClient } from './client';

/** Helper to create a realistic AxiosError with a response. */
function axiosError(status: number, data?: unknown): AxiosError {
  return new AxiosError('Request failed', 'ERR_BAD_REQUEST', undefined, undefined, {
    status,
    data,
    statusText: String(status),
    headers: {},
    config: {} as AxiosResponse['config'],
  } as AxiosResponse);
}

describe('mapApiError', () => {
  it('returns validation body as-is for 400 responses', () => {
    const validationData = {
      title: 'Validation failed',
      status: 400,
      errors: { email: ['Email is required.'], subject: ['Subject is required.'] },
    };
    const result = mapApiError(axiosError(400, validationData));
    expect(result).toEqual({ status: 400, body: validationData });
  });

  it('returns "Not found" for 404 responses', () => {
    const result = mapApiError(axiosError(404));
    expect(result).toEqual({ status: 404, body: { message: 'Not found' } });
  });

  it('uses the title field from response data for other errors', () => {
    const result = mapApiError(axiosError(503, { title: 'Service Unavailable' }));
    expect(result).toEqual({
      status: 503,
      body: { message: 'Service Unavailable' },
    });
  });

  it('defaults to generic message when response has no title', () => {
    const result = mapApiError(axiosError(500, {}));
    expect(result).toEqual({
      status: 500,
      body: { message: 'An unexpected error occurred' },
    });
  });

  it('returns 500 for Axios errors without a response (e.g. network)', () => {
    const networkError = new AxiosError('Network Error', 'ERR_NETWORK');
    const result = mapApiError(networkError);
    expect(result).toEqual({
      status: 500,
      body: { message: 'An unexpected error occurred' },
    });
  });

  it('returns 500 for non-Axios errors', () => {
    const result = mapApiError(new TypeError('Cannot read properties'));
    expect(result).toEqual({
      status: 500,
      body: { message: 'An unexpected error occurred' },
    });
  });
});

describe('authenticatedApiClient', () => {
  it('attaches Authorization header via request interceptor', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- accessing internal interceptor handlers for testing
    const handlers = (authenticatedApiClient.interceptors.request as any).handlers as Array<{
      fulfilled: (config: never) => Promise<Record<string, unknown>>;
    }>;
    const config = await handlers[0].fulfilled({
      headers: new (await import('axios')).AxiosHeaders(),
    } as never);

    expect(config.baseURL).toBe('http://test-api.example.com');
    expect((config.headers as Record<string, string>).Authorization).toBe(
      'Bearer test-access-token',
    );
  });
});
