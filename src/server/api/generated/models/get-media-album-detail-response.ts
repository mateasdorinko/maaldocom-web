/* tslint:disable */
/* eslint-disable */
import type { GetCommentResponse, GetMediaAlbumResponse, GetMediaResponse } from '.';

export interface GetMediaAlbumDetailResponse extends GetMediaAlbumResponse {
  'description'?: string | null;
  'active'?: boolean;
  'comments'?: Array<GetCommentResponse>;
  'media'?: Array<GetMediaResponse>;
}
