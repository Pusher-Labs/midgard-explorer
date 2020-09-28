import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ApiService } from '../_services/api.service';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-explorer-ui',
  templateUrl: './explorer-ui.component.html',
  styleUrls: ['./explorer-ui.component.scss'],
})
export class ExplorerUiComponent implements OnInit {
  currentEndpoint = null;
  response = null;
  loading = false;
  paramMap = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {
    this.router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe((ev) => {
        if (!this.paramMap[this.router.url]) {
          this.paramMap[this.router.url] = {};
        }
        this.updateEndpoint(this.router.url);
        this.updateParamFromUrl(this.router.url);
      });
  }

  getValue(param): string {
    return this.paramMap[this.router.url][param.name] || '';
  }

  searchParamsFromUrl(url): any {
    let currentQ = '';
    try {
      currentQ = url.split('?')[1];
    } catch (err) {
      // Ignore
    }
    return new URLSearchParams(currentQ);
  }

  async updateEndpoint(path): Promise<void> {
    this.loading = true;
    this.currentEndpoint = await this.api.getEndpoint(path);

    try {
      this.response = await this.api.callEndpoint({
        path: this.makePathWithParams(),
      });
    } catch (err) {
      console.error('Call endpoint err:', err.message);
      console.log(err);
      this.response = err.error.message || err.error.error;
      console.log(this.response);
    }
    this.loading = false;
  }

  formatResponse(): string {
    return JSON.stringify(this.response, null, 4);
  }

  updateParams({ event, param }): void {
    this.paramMap[this.router.url][event.target.name] = event.target.value;
  }

  updateParamFromUrl(url): void {
    const params = this.searchParamsFromUrl(url);
    for (const pair of params.entries()) {
      this.paramMap[this.router.url][pair[0]] = pair[1];
    }
  }

  submitQueries(e): void {
    e.preventDefault();
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.paramMap[this.router.url],
      queryParamsHandling: 'merge',
    });

    this.updateEndpoint(this.router.url);
  }

  makePathWithParams(): string {
    if (!this.currentEndpoint) {
      return;
    }
    let hasQuery = false;
    const params = this.searchParamsFromUrl(this.router.url);
    this.currentEndpoint.params?.forEach((p) => {
      if (p.in === 'query') {
        const userValue = this.paramMap[this.router.url][p.name];
        if (userValue) {
          params.set(p.name, userValue);
          hasQuery = true;
        }
      }
    });

    let path = this.currentEndpoint.path;
    if (hasQuery) {
      path += `?${params.toString()}`;
    }
    return path;
  }

  ngOnInit(): void {
    this.updateEndpoint(this.router.url);
  }
}
