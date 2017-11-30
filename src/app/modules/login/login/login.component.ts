import { Component, OnInit } from '@angular/core';

import { Config } from "../../../core/config/config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public logginFacebook: string;
  public loginTwitter: string;
  public loginGoogle: string;

  constructor() {
    this.logginFacebook = Config.loginFacebook;
    this.loginTwitter = Config.loginTwitter;
    this.loginGoogle = Config.loginGoogle;
  }

  ngOnInit() { }

}
