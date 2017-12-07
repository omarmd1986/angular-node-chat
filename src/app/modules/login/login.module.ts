import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, LoginCallbackComponent, LogoutComponent],
  exports: []
})
export class LoginModule { }
