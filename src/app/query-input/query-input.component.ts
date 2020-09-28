import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-query-input',
  templateUrl: './query-input.component.html',
  styleUrls: ['./query-input.component.scss']
})
export class QueryInputComponent implements OnInit {
  @Input param;
  paramMap = {}

  constructor() { }

  ngOnInit(): void {
    console.log('param', this.param)
  }

}
