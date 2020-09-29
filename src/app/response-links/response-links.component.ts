import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-response-links',
  templateUrl: './response-links.component.html',
  styleUrls: ['./response-links.component.scss'],
})
export class ResponseLinksComponent implements OnInit {
  @Input() response;
  formattedResponse = [];

  nextMap = {
    '/v1/pools': (item) => {
      const routerLink = `/v1/pools/detail`;
      const queryParams = { asset: item };
      const urlP = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        urlP.set(key, value);
      });

      return {
        routerLink,
        queryParams,
        label: item,
        prettyUrl: `${routerLink}${urlP.toString()}`,
      };
    },
    '/v1/stakers': (item) => {
      const routerLink = `/v1/stakers/${item}`;
      const queryParams = {};
      const urlP = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        urlP.set(key, value);
      });

      return {
        routerLink,
        queryParams,
        label: item,
        prettyUrl: `${routerLink}${urlP.toString()}`,
      };
    },
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const parser = this.nextMap[this.router.url];
    if (parser) {
      this.formattedResponse = this.response.map((item) => parser(item));
    }
  }
}
