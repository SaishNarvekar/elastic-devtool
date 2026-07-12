/* src/api.ts */
import { createApiRef, DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';

export interface ElasticDevToolApiOptions {
  discoveryApi: DiscoveryApi;
  fetchApi: FetchApi;
}

export interface ElasticDevToolApi {
  health: () => Promise<any>;
  indices: () => Promise<any>;  
  search: (index: string, body: string) => Promise<any>;
}

export const elasticDevToolApiRef = createApiRef<ElasticDevToolApi>({
  id: 'plugin.elastic-devtool.service',
});

export class ElasticDevToolApiClient implements ElasticDevToolApi {
  options: ElasticDevToolApiOptions;

  constructor(options: ElasticDevToolApiOptions) {
    this.options = options;
  }

  private async fetch<T = any>(input: string, init?: RequestInit): Promise<T> {
    const proxyUri = `${await this.options.discoveryApi.getBaseUrl('elastic-devtool')}`;

    const resp = await this.options.fetchApi.fetch(`${proxyUri}${input}`, {
      ...init,
    });
    if (!resp.ok) throw new Error(resp.statusText);
    return await resp.json();
  }

  async health(): Promise<any> {
    return await this.fetch<any>('/health');
  }

  async indices(): Promise<any> {
    return await this.fetch<any>('/indices');
  }

  async search(index: string, body: any): Promise<any> {
    return await this.fetch<any>(`/search?index=${index}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

}