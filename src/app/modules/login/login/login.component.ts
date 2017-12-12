import { Component, OnInit } from '@angular/core';

import { Config, LoggerService, Message } from "../../../core/index";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public logginFacebook: string;
  public loginTwitter: string;
  public loginGoogle: string;

  public lastError: Message | null;

  constructor(
    private logger: LoggerService
  ) {
    this.logginFacebook = Config.loginFacebook;
    this.loginTwitter = Config.loginTwitter;
    this.loginGoogle = Config.loginGoogle;
  }

  ngOnInit() {
    this.lastError = this.logger.lastError();
  }

}
