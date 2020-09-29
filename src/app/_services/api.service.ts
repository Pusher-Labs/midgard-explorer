import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

// @Todo proper types for each response, functions etc.

const IGNORED_ENDPOINTS = ['/v1/doc', '/v1/swagger.json'];

const DEFAULT_NETWORK = 'chaosnet';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  networks = {
    chaosnet: 'https://chaosnet-midgard.bepswap.com',
    testnet: 'https://midgard.bepswap.com',
  };
  activeNetwork = 'chaosnet';
  endpoints = [];

  constructor(private http: HttpClient) {
    this.activeNetwork = this.getActiveNetwork();
  }

  async getEndpoint(path: string): Promise<string> {
    let url = decodeURI(path);
    url = url.split('?')[0]; // Remove query params

    // Reload endpoints if empty
    if (this.endpoints.length === 0) {
      await this.getEndpoints();
    }

    for (const i of this.endpoints) {
      if (i.path === url) {
        return i;
      }
    }
    // @Todo show endpoint not found component
  }

  setActiveNetwork(network): void {
    localStorage.setItem('activeNetwork', network);
    // @Todo hacky way. Ideally we should make any observable
    // on the activenetwork and reload any component. But for now
    // just reload the browser
    location.reload();
  }

  getActiveNetwork(): string {
    const net = localStorage.getItem('activeNetwork');
    if (!net) {
      localStorage.setItem('activeNetwork', DEFAULT_NETWORK);
      return DEFAULT_NETWORK;
    }
    return net;
  }

  getRoot(): string {
    return this.networks[this.activeNetwork];
  }

  formatEndpoints(endpoints = []): any[] {
    const result = [];
    Object.entries(endpoints).forEach(([path, data]) => {
      if (IGNORED_ENDPOINTS.includes(path)) {
        return;
      }

      // @Todo only GET supported for now
      if (data.get) {
        result.push({
          path,
          method: 'GET',
          description: data.get.description,
          summary: data.get.summary,
          params: data.get.parameters,
        });
      }
    });
    return result;
  }

  async getEndpoints(): Promise<any> {
    const path = '/v1/swagger.json';
    const response: any = await this.http
      .get(`${this.getRoot()}${path}`)
      .toPromise();
    this.endpoints = this.formatEndpoints(response.paths);
    console.log('endpoints', response);
    return this.endpoints;
  }

  callEndpoint(opts): Promise<any> {
    const { path, method = 'GET' } = opts;
    if (!path) {
      return null;
    }
    return this.http.get(`${this.getRoot()}${path}`).toPromise();
  }
}
