/* tslint:disable */
/* eslint-disable */
/**
 * maaldo.com API Reference — Knowledge endpoints
 * Auto-generated from OpenAPI specification.
 */
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { GetKnowledgeResponse } from '../models';

export class KnowledgeApi {
  constructor(private axios: AxiosInstance) {}

  /** GET /knowledge */
  async listKnowledge(): Promise<AxiosResponse<GetKnowledgeResponse[]>> {
    return this.axios.get<GetKnowledgeResponse[]>('/knowledge');
  }

  /** GET /knowledge/random */
  async getRandomKnowledge(): Promise<AxiosResponse<GetKnowledgeResponse>> {
    return this.axios.get<GetKnowledgeResponse>('/knowledge/random');
  }

  /** GET /knowledge/{id} */
  async getKnowledgeById(id: string): Promise<AxiosResponse<GetKnowledgeResponse>> {
    return this.axios.get<GetKnowledgeResponse>(`/knowledge/${encodeURIComponent(id)}`);
  }
}
