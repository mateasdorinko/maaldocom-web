/**
 * Server-only entrypoint.
 * Re-exports the API client and typed API instances.
 * Importing this module (or anything under src/server/) from a client
 * component will cause a build-time error via the `server-only` package.
 */
import 'server-only';

export {
  apiClient,
  knowledgeApi,
  tagsApi,
  mediaAlbumsApi,
  systemApi,
  mapApiError,
} from './api/client';

export type { ApiValidationError } from './api/client';
