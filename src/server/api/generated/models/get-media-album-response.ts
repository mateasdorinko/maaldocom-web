/* tslint:disable */
/* eslint-disable */
import type { BaseModel } from '.';

export interface GetMediaAlbumResponse extends BaseModel {
  'name'?: string | null;
  'slug'?: string | null;
  'created'?: string;
  'tags'?: Array<string>;
  'href'?: string | null;
  'altHref'?: string | null;
  'thumbHref'?: string | null;
}
