import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

import { LoggerService } from "../services/logger.service";
import { JwtHandlerService } from "../services/jwt-handler.service";
import { Config } from "../config/config";

@Injectable()
export class MessagesService {

  constructor(
    private logger: LoggerService,
    private jwt: JwtHandlerService,
    private http: HttpClient
  ) { }

  send(roomId: string, text: string): Observable<any> {
    let req = this.http.post<any>(`${Config.API_URL}/user/sent/message/${roomId}`, {text: text}, this.jwt.httpOptions());
    return this.logger.handleRequest<any>(req, 'Sending message to room.', null);
  }

}
