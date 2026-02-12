/* tslint:disable */
/* eslint-disable */
/**
 * maaldo.com API Reference — Tags endpoints
 * Auto-generated from OpenAPI specification.
 */
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { GetTagResponse, GetTagDetailResponse } from '../models';

export class TagsApi {
  constructor(private axios: AxiosInstance) {}

  /** GET /tags */
  async listTags(): Promise<AxiosResponse<GetTagResponse[]>> {
    return this.axios.get<GetTagResponse[]>('/tags');
  }

  /** GET /tags/{id} */
  async getTagById(id: string): Promise<AxiosResponse<GetTagDetailResponse>> {
    return this.axios.get<GetTagDetailResponse>(`/tags/${encodeURIComponent(id)}`);
  }

  /** GET /tags/{name} */
  async getTagByName(name: string): Promise<AxiosResponse<GetTagDetailResponse>> {
    return this.axios.get<GetTagDetailResponse>(`/tags/${encodeURIComponent(name)}`);
  }
}
