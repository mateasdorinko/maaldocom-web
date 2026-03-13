/* tslint:disable */
/* eslint-disable */
import type { GetCommentResponse, GetWritingResponse } from '.';

export interface GetWritingDetailResponse extends GetWritingResponse {
  'comments'?: Array<GetCommentResponse>;
  'body'?: string | null;
}
