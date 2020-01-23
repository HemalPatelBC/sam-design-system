import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sds-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss']
})
export class SdsCollapseComponent implements OnInit {
  isCollapsed:boolean;

  constructor() {
    this.isCollapsed = true;
   }

  ngOnInit() {
  }

}
