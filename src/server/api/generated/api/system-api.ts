/* tslint:disable */
/* eslint-disable */
/**
 * maaldo.com API Reference — System endpoints
 * Auto-generated from OpenAPI specification.
 */
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { PostMailRequest } from '../models';

export class SystemApi {
  constructor(private axios: AxiosInstance) {}

  /** POST /system/mail */
  async postMail(request: PostMailRequest): Promise<AxiosResponse<void>> {
    return this.axios.post<void>('/system/mail', request);
  }

  /** POST /system/cache-refreshes */
  async refreshCache(): Promise<AxiosResponse<void>> {
    return this.axios.post<void>('/system/cache-refreshes');
  }
}
