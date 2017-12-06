import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { LoginCallbackComponent } from './login-callback/login-callback.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, LoginCallbackComponent],
  exports: []
})
export class LoginModule { }
