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

const API_BASE_URL = process.env.API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL environment variable is not set');
}

/** Pre-configured Axios instance for server-side API calls */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Typed API instances (used by route handlers) ──────────────────────

export const knowledgeApi = new KnowledgeApi(apiClient);
export const tagsApi = new TagsApi(apiClient);
export const mediaAlbumsApi = new MediaAlbumsApi(apiClient);
export const systemApi = new SystemApi(apiClient);

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
