import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { LogoutComponent } from './logout/logout.component';

import { CoreModule } from "../../core/index";

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [LoginComponent, LoginCallbackComponent, LogoutComponent],
  exports: []
})
export class LoginModule { }
