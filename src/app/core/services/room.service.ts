import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { LoggerService } from "../services/logger.service";
import { JwtHandlerService } from "../services/jwt-handler.service";
import { LoginUser } from "../models/login-user";
import { Room } from "../models/room";
import { Config } from "../config/config";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoomService {

  constructor(
    private http: HttpClient,
    private jwt: JwtHandlerService,
    private logger: LoggerService
  ) { }

  /**
   * Getting all public rooms
   */
  roomsPublic(): Observable<Room[]> {
    let req = this.http.get<any>(`${Config.API_URL}/room`, this.jwt.httpOptions());
    return this.logger.handleRequest<Room[]>(req, ``, []);
  }

  room(roomId: string): Observable<Room> {
    let req = this.http.get<any>(`${Config.API_URL}/room/${roomId}`, this.jwt.httpOptions());
    return this.logger.handleRequest<Room>(req, ``, null);
  }

  /**
   * The user connect to the room
   * @param roomId 
   */
  roomConnect(roomId: string): Observable<Room> {
    let req = this.http.put<any>(`${Config.API_URL}/room/${roomId}/connect`, null, this.jwt.httpOptions());
    return this.logger.handleRequest<Room>(req, `The user connect to the room`, null);
  }

  /**
   * The user disconnect to the room
   * @param roomId 
   */
  roomDisconnect(roomId: string): Observable<Room> {
    let req = this.http.put<any>(`${Config.API_URL}/room/${roomId}/disconnect`, null, this.jwt.httpOptions());
    return this.logger.handleRequest<Room>(req, `The user disconnect to the room`, null);
  }

  /**
   * Getting all, public and private rooms
   */
  rooms(): Observable<Room[]> {
    let req = this.http.get<any>(`${Config.API_URL}/admin/room`, this.jwt.httpOptions());
    return this.logger.handleRequest<Room[]>(req, ``, []);
  }
  
  adminRoom(roomId: string): Observable<Room> {
    let req = this.http.get<any>(`${Config.API_URL}/admin/room/${roomId}`, this.jwt.httpOptions());
    return this.logger.handleRequest<Room>(req, ``, null);
  }


  addRoom(room: Room): Observable<Room> {
    let req = this.http.post<any>(`${Config.API_URL}/admin/room`, room, this.jwt.httpOptions());
    return this.logger.handleRequest<Room>(req, ``, null);
  }

  /**
   * @param roomId  
   */
  toggleActive(roomId: string): Observable<boolean> {
    let req = this.http.put<any>(`${Config.API_URL}/admin/room/${roomId}/toggle/active`, null, this.jwt.httpOptions());
    return this.logger.handleRequest<boolean>(req, ``, null);
  }
  
  /**
   * The room needs some moderator approve the messages to be public
   * @param roomId 
   */
  toggleApproval(roomId: string): Observable<boolean> {
    let req = this.http.put<any>(`${Config.API_URL}/admin/room/${roomId}/toggle/approval`, null, this.jwt.httpOptions());
    return this.logger.handleRequest<boolean>(req, ``, null);
  }
}
