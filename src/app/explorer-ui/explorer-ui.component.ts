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
  paramMap = {}

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private api: ApiService) {
    this.router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe((ev) => {
        this.paramMap = {}
        this.updateEndpoint(this.router.url);
        this.updateParamFromUrl(this.router.url);
      });
  }

  searchParamsFromUrl(url){
    let currentQ = ""
    try{
      currentQ = url.split("?")[1]
    }catch(err){
      // Ignore
    }
    return new URLSearchParams(currentQ);
  }

  async updateEndpoint(path) {
    this.loading = true;
    this.currentEndpoint = await this.api.getEndpoint(path);


    try{
      this.response = await this.api.callEndpoint({ path: this.makePathWithParams() });
    }catch(err){
      console.error("Call endpoint err:", err.message);
      this.response = err.error.message;
    }
    this.loading = false;
  }

  formatResponse() {
    return JSON.stringify(this.response, null, 4);
  }

  updateParams(e) {
    this.paramMap[e.target.name] = e.target.value
  }

  updateParamFromUrl(url){
    const params = this.searchParamsFromUrl(url)
    for(let pair of params.entries()){
      this.paramMap[pair[0]] = pair[1]
    }
  }

  submitQueries(e){
    e.preventDefault()
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: this.paramMap, 
        queryParamsHandling: 'merge', 
      });

      this.updateEndpoint(this.router.url);
  }

  
  makePathWithParams(){
    if(!this.currentEndpoint){
      return;
    }
    let hasQuery = false
    const params = this.searchParamsFromUrl(this.router.url)
    this.currentEndpoint.params?.forEach(p=>{
      console.log(p)
      if(p.in === 'query'){
        let userValue = this.paramMap[p.name] || ''
        params.set(p.name, userValue)
        hasQuery = true;
      }
    })

    let path = this.currentEndpoint.path
    if(hasQuery){
      path += `?${params.toString()}`
    }
    return path;
  }

  ngOnInit() {
    this.updateEndpoint(this.router.url);
  }
}
