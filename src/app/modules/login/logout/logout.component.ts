import { Component, OnInit } from '@angular/core';

import { JwtHandlerService, NavigateService } from "../../../core/index";

@Component({
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    private jwt: JwtHandlerService,
    private navigate: NavigateService
  ) { }

  ngOnInit() {
    this.jwt.cleanSession();
    this.navigate.go('');
  }

}
