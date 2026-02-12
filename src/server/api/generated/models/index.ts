/* tslint:disable */
/* eslint-disable */
/**
 * maaldo.com API Reference
 * Auto-generated TypeScript models from OpenAPI specification.
 * To regenerate: npm run api:generate (requires Java)
 */

export interface BaseModel {
  id?: string;
}

export interface GetKnowledgeResponse extends BaseModel {
  title?: string | null;
  quote?: string | null;
  href?: string | null;
}

export interface GetTagResponse extends BaseModel {
  href?: string | null;
  altHref?: string | null;
  name?: string | null;
  count?: number;
}

export interface GetMediaAlbumTagResponse {
  mediaAlbumId?: string;
  name?: string | null;
  urlFriendlyName?: string | null;
  href?: string | null;
}

export interface GetMediaTagResponse {
  mediaAlbumId?: string;
  mediaAlbumName?: string | null;
  mediaAlbumUrlFriendlyName?: string | null;
  mediaId?: string;
  name?: string | null;
  href?: string | null;
}

export interface GetTagDetailResponse extends GetTagResponse {
  mediaAlbums?: Array<GetMediaAlbumTagResponse>;
  media?: Array<GetMediaTagResponse>;
}

export interface GetMediaResponse extends BaseModel {
  fileName?: string | null;
  description?: string | null;
  sizeInBytes?: number;
  contentType?: string | null;
  tags?: Array<string>;
  href?: string | null;
  thumbHref?: string | null;
  viewerHref?: string | null;
}

export interface GetMediaAlbumResponse extends BaseModel {
  name?: string | null;
  urlFriendlyName?: string | null;
  created?: string;
  tags?: Array<string>;
  href?: string | null;
  altHref?: string | null;
  thumbHref?: string | null;
}

export interface GetMediaAlbumDetailResponse extends GetMediaAlbumResponse {
  description?: string | null;
  active?: boolean;
  media?: Array<GetMediaResponse>;
}

export interface PostMailRequest {
  from?: string;
  subject?: string;
  body?: string;
}

export interface PostMediaAlbumRequest {
  name?: string | null;
  urlFriendlyName?: string | null;
  created?: string;
  description?: string | null;
  tags?: Array<string>;
  media?: Array<PostMediaRequest>;
}

export interface PostMediaRequest {
  fileName?: string | null;
  description?: string | null;
  sizeInBytes?: number;
  fileExtension?: string | null;
  tags?: Array<string>;
}

export interface PostMediaAlbumResponse extends BaseModel {
  name?: string | null;
  urlFriendlyName?: string | null;
  created?: string;
  tags?: Array<string>;
  href?: string | null;
  altHref?: string | null;
}
