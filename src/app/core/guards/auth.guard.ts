import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { JwtHandlerService } from "../services/jwt-handler.service";
import { NavigateService } from "../services/navigate.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtHandlerService,
    private navigate: NavigateService
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    //Here we can check is the user has loggin or not.
    return this.jwt.isLoggin().do(value => {
      if(!value){
        this.navigate.go('/login');
        return false;
      }
      return true;
    });
  }
}
