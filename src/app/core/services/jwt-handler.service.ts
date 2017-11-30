import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Observable for ajax request.
import { Observable } from 'rxjs/Observable';

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

  private _httpOptions = {
    headers: null
  };

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) { this.init(); }

  private init(): void {
    let token = this.getJwt();
    this.updateHeaders(token);
  }

  getJwt(): string | null {
    try {
      return localStorage.getItem(Config.jwtLocalStorage);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  setJwt(token: string): void {
    try {
      localStorage.setItem(Config.jwtLocalStorage, token);
      this.updateHeaders(token);
    } catch (error) {
      console.error(error);
      this.cleanSession();
    }
  }

  cleanSession(): void {
    try {
      localStorage.removeItem(Config.jwtLocalStorage);
    } catch (error) {
      console.error(error);
    }
  }

  user(): LoginUser | null {
    let token = this.getJwt();
    if (!token) return null;
    try {
      let obj = JWT(token);
      return obj;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  isLoggin(): Observable<boolean> {
    let req = this.http.get<any>(this.checkJWT, this._httpOptions);
    return this.logger.handleRequest<boolean>(req, 'Validating JWT', false);
  }

  private updateHeaders(jwt: string): void {
    delete this._httpOptions.headers;
    this._httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': jwt
    })
  }

  public httpOptions(): object {
    return this._httpOptions;
  }
}
