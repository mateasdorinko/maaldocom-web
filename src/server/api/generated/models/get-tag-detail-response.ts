/* tslint:disable */
/* eslint-disable */
import type { GetMediaAlbumTagResponse, GetMediaTagResponse, GetWritingTagResponse } from '.';
import type { GetTagResponse } from './get-tag-response';

export interface GetTagDetailResponse extends GetTagResponse {
  'mediaAlbums'?: Array<GetMediaAlbumTagResponse>;
  'media'?: Array<GetMediaTagResponse>;
  'writings'?: Array<GetWritingTagResponse>;
}
