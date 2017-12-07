import { Component, OnInit } from '@angular/core';

import { MenuService } from "../menu.service";

@Component({
  selector: 'aside-nav-bar',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public over: boolean;

  constructor(
    public _menu: MenuService
  ) { 
    this.over = false;
  }

  ngOnInit() { }

  close($event): void {
    this.over = false;
  }

  show($event): void{
    this.over = true;
  }

}
