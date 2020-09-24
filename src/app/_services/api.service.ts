import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //Get Node lsit
  //https://testnet-seed.thorchain.info/node_ip_list.json
  //Get api schema
  // http://175.41.137.209:8080/v1/swagger.json
  constructor(private http: HttpClient) {}

  getNodes() {}

  async callEndpoint(opts) {
    const ROOT = 'http://175.41.137.209:8080';
    const { path, method = 'GET' } = opts;
    return this.http.get(`${ROOT}${path}`).toPromise();
  }
}
