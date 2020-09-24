import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent implements OnInit {
  endpoints = [];

  constructor(private api: ApiService) {
    this.updateEndpoint();
  }

  async updateEndpoint() {
    this.endpoints = await this.api.getEndpoints();
  }

  ngOnInit(): void {}
}
