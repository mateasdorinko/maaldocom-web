/**
 * Thin wrapper around the generated Axios client.
 * Configures base URL, timeouts, and error mapping.
 *
 * This file is server-only. It must never be imported by client components.
 */
import 'server-only';

import axios from 'axios';
import type { AxiosError, AxiosInstance } from 'axios';
import { KnowledgeApi, TagsApi, MediaAlbumsApi, SystemApi } from './generated';
import { getClientCredentialsToken } from './token';

function getBaseURL(): string {
  const url = process.env.API_BASE_URL;
  if (!url) {
    throw new Error('API_BASE_URL environment variable is not set');
  }
  return url;
}

/** Pre-configured Axios instance for server-side API calls */
export const apiClient: AxiosInstance = axios.create({
  timeout: 15_000,
  headers: {
    Accept: 'application/json',
  },
});

// Resolve API_BASE_URL at request time so the module can be imported during build
apiClient.interceptors.request.use((config) => {
  config.baseURL = getBaseURL();
  return config;
});

/** Authenticated Axios instance that attaches a client credentials token */
export const authenticatedApiClient: AxiosInstance = axios.create({
  timeout: 15_000,
  headers: {
    Accept: 'application/json',
  },
});

authenticatedApiClient.interceptors.request.use(async (config) => {
  config.baseURL = getBaseURL();
  const token = await getClientCredentialsToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Typed API instances (used by route handlers) ──────────────────────

export const knowledgeApi = new KnowledgeApi(apiClient);
export const tagsApi = new TagsApi(apiClient);
export const mediaAlbumsApi = new MediaAlbumsApi(apiClient);
export { SystemApi };

// ── Media URL resolution ──────────────────────────────────────────────

/** Resolves a relative API media path to an absolute URL using API_BASE_URL. */
export function resolveMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${getBaseURL()}${path}`;
}

// ── Error mapping ─────────────────────────────────────────────────────

/** Typed error shape returned by the API on 400 responses */
export interface ApiValidationError {
  title?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

/** Maps Axios errors to a consistent shape for route handlers */
export function mapApiError(error: unknown): {
  status: number;
  body: ApiValidationError | { message: string };
} {
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<ApiValidationError>;
    const status = axiosErr.response?.status ?? 500;
    const data = axiosErr.response?.data;

    if (status === 400 && data) {
      return { status, body: data };
    }

    if (status === 404) {
      return { status, body: { message: 'Not found' } };
    }

    return {
      status,
      body: { message: data?.title ?? 'An unexpected error occurred' },
    };
  }

  return { status: 500, body: { message: 'An unexpected error occurred' } };
}
