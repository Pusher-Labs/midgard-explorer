import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-explorer-ui',
  templateUrl: './explorer-ui.component.html',
  styleUrls: ['./explorer-ui.component.scss'],
})
export class ExplorerUiComponent implements OnInit {
  currentEndpoint: string;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe((ev) => {
        this.updateEndpoint(this.router.url);
      });
  }

  updateEndpoint(url) {
    this.currentEndpoint = url;
  }

  ngOnInit() {}
}
