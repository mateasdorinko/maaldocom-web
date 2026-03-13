/**
 * Re-export API model types for use by BOTH server and client code.
 * These are pure TypeScript interfaces — no runtime code, no server-only guard.
 * Client components should import types from here, not from @/server.
 */
export type {
  GetKnowledgeResponse,
  GetTagResponse,
  GetTagDetailResponse,
  GetMediaAlbumTagResponse,
  GetMediaTagResponse,
  GetMediaResponse,
  GetMediaAlbumResponse,
  GetMediaAlbumDetailResponse,
  GetWritingResponse,
  GetWritingDetailResponse,
  GetWritingTagResponse,
  GetCommentResponse,
  PostMailRequest,
} from '@/server/api/generated/models';
