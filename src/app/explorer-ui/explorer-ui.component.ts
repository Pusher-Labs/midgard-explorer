import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../_services/api.service';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-explorer-ui',
  templateUrl: './explorer-ui.component.html',
  styleUrls: ['./explorer-ui.component.scss'],
})
export class ExplorerUiComponent implements OnInit {
  currentEndpoint = {};
  response = null;

  constructor(private router: Router, private api: ApiService) {
    this.router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe((ev) => {
        this.updateEndpoint(this.router.url);
      });
  }

  async updateEndpoint(path) {
    this.currentEndpoint = await this.api.getEndpoint(path);
    this.response = await this.api.callEndpoint({ path });

    console.log(this.currentEndpoint, this.response);
  }

  formatResponse() {
    return JSON.stringify(this.response, null, 4);
  }

  ngOnInit() {
    this.updateEndpoint(this.router.url);
  }
}
