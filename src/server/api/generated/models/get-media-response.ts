/* tslint:disable */
/* eslint-disable */
import type { BaseModel } from '.';

export interface GetMediaResponse extends BaseModel {
  'fileName'?: string | null;
  'description'?: string | null;
  'sizeInBytes'?: number;
  'contentType'?: string | null;
  'tags'?: Array<string>;
  'href'?: string | null;
  'thumbHref'?: string | null;
  'viewerHref'?: string | null;
}
