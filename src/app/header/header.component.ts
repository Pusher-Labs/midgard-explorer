import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  networks = null;
  activeNetwork = null;

  constructor(private api: ApiService, private router: Router) {
    this.activeNetwork = this.api.getActiveNetwork();
    this.networks = this.api.networks;
  }

  handleNetworkChange(e): void {
    const newNet = e.target.value;
    this.api.setActiveNetwork(newNet);
    this.activeNetwork = newNet;
  }

  networkList(): any[] {
    return Object.keys(this.networks);
  }

  ngOnInit(): void {}
}
