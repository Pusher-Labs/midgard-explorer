import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//@Todo proper types for each response, functions etc.

//@Todo incomplete. remove some of these when they are supported
const IGNORED_ENDPOINTS = [
  '/v1/doc',
  '/v1/swagger.json',
  '/v1/assets',
  '/v1/history/total_volume',
  '/v1/pools/detail',
  '/v1/stakers/{address}',
  '/v1/stakers/{address}/pools',
  '/v1/txs',
];

const ROOT = 'http://175.41.137.209:8080';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  endpoints = [];
  //Get Node lsit
  //https://testnet-seed.thorchain.info/node_ip_list.json
  constructor(private http: HttpClient) {}

  getNodes() {}

  async getEndpoint(path: string) {
    //Reload endpoints if empty
    if (this.endpoints.length === 0) {
      await this.getEndpoints();
    }

    for (let i of this.endpoints) {
      if (i.path === path) {
        return i;
      }
    }
  }

  formatEndpoints(endpoints = []) {
    const result = [];
    Object.entries(endpoints).forEach(([path, data]) => {
      if (IGNORED_ENDPOINTS.includes(path)) {
        return;
      }

      //@Todo only GET supported for now
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

  async getEndpoints() {
    const path = '/v1/swagger.json';
    const response: any = await this.http.get(`${ROOT}${path}`).toPromise();
    this.endpoints = this.formatEndpoints(response.paths);
    return this.endpoints;
  }

  callEndpoint(opts) {
    const { path, method = 'GET' } = opts;
    return this.http.get(`${ROOT}${path}`).toPromise();
  }
}
