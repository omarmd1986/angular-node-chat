import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Observable for ajax request.
import { Observable } from 'rxjs/Observable';

//Test porpose. Remove it.
import { of } from 'rxjs/observable/of';

import * as JWT from "jwt-decode";
import { Config } from "../config/config";
import { LoginUser } from "../models/login-user";
import { LoggerService } from "./logger.service";

@Injectable()
export class JwtHandlerService {
  
  /**
   * URL to validate the token.
   */
  private checkJWT = Config.API_URL + '/check';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  getJwt(): string{
    return localStorage.getItem(Config.jwtLocalStorage);
  }

  setJwt(token: string):void{
    localStorage.setItem(Config.jwtLocalStorage, token);
  }

  cleanSession(): void{
    localStorage.removeItem(Config.jwtLocalStorage);
  }

  user(): LoginUser | null {
    let token = this.getJwt();
    if(!token) return null;
    try {
      let obj = JWT(token);  
      return obj;
    } catch (error) {
      return null;      
    }
  }

  isLoggin(): Observable<boolean> {
    let req = this.http.get<any>(this.checkJWT, this.httpOptions);
    return this.logger.handleRequest<boolean>(req, 'Validating JWT', false);
  }
}
