/* tslint:disable */
/* eslint-disable */
import type { BaseModel } from '.';

export interface GetWritingResponse extends BaseModel {
  'href'?: string | null;
  'altHref'?: string | null;
  'title'?: string | null;
  'slug'?: string | null;
  'created'?: string;
  'blurb'?: string | null;
  'tags'?: Array<string>;
}
