import { Component, OnInit, Input } from '@angular/core';

import { MenuService } from "../menu.service";

@Component({
  selector: 'aside-nav-bar',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() longText: string | null;
  // directive
  shortText: string | null;

  @Input() active: boolean;

  constructor(
    public _menu: MenuService
  ) {
    this.active = true;
  }

  ngOnInit() { }
}
