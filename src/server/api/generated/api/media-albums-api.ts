/* tslint:disable */
/* eslint-disable */
/**
 * maaldo.com API Reference — Media Albums endpoints
 * Auto-generated from OpenAPI specification.
 */
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { GetMediaAlbumResponse, GetMediaAlbumDetailResponse } from '../models';

export class MediaAlbumsApi {
  constructor(private axios: AxiosInstance) {}

  /** GET /media-albums */
  async listMediaAlbums(): Promise<AxiosResponse<GetMediaAlbumResponse[]>> {
    return this.axios.get<GetMediaAlbumResponse[]>('/media-albums');
  }

  /** GET /media-albums/{id} (by GUID) */
  async getMediaAlbumById(id: string): Promise<AxiosResponse<GetMediaAlbumDetailResponse>> {
    return this.axios.get<GetMediaAlbumDetailResponse>(
      `/media-albums/${encodeURIComponent(id)}`,
    );
  }

  /** GET /media-albums/{name} (by URL-friendly name) */
  async getMediaAlbumByName(name: string): Promise<AxiosResponse<GetMediaAlbumDetailResponse>> {
    return this.axios.get<GetMediaAlbumDetailResponse>(
      `/media-albums/${encodeURIComponent(name)}`,
    );
  }
}
