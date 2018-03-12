import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { LoggerService } from "../services/logger.service";
import { JwtHandlerService } from "../services/jwt-handler.service";
import { LoginUser, LoginUserContainer } from "../models/login-user";
import { Room, RoomContainer } from "../models/room";
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
  roomsPublic(): Observable<RoomContainer> {
    let req = this.http.get<any>(`${Config.API_URL}/room`, this.jwt.httpOptions());
    return this.logger.handleRequest<RoomContainer>(req, ``, null);
  }

  room(roomId: string): Observable<Room> {
    let req = this.http.get<any>(`${Config.API_URL}/room/${roomId}`, this.jwt.httpOptions());
    return this.logger.handleRequest<Room>(req, ``, null);
  }

  toggleUpdates(roomId: string): Observable<boolean> {
    let req = this.http.put<boolean>(`${Config.API_URL}/room/${roomId}/toggle/silence`, null, this.jwt.httpOptions());
    return this.logger.handleRequest<any>(req, ``, false);
  }

  /**
   * Getting all, public and private rooms
   */
  rooms(): Observable<RoomContainer> {
    let req = this.http.get<any>(`${Config.API_URL}/admin/room`, this.jwt.httpOptions());
    return this.logger.handleRequest<RoomContainer>(req, ``, null);
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
    let req = this.http.put<boolean>(`${Config.API_URL}/admin/room/${roomId}/toggle/active`, null, this.jwt.httpOptions());
    return this.logger.handleRequest<boolean>(req, ``, null);
  }

  /**
   * The room needs some moderator approve the messages to be public
   * @param roomId 
   */
  toggleApproval(roomId: string): Observable<boolean> {
    let req = this.http.put<boolean>(`${Config.API_URL}/admin/room/${roomId}/toggle/approval`, null, this.jwt.httpOptions());
    return this.logger.handleRequest<boolean>(req, ``, null);
  }

  /**
   * 
   * @param roomId 
   */
  users(roomId: string): Observable<LoginUserContainer> {
    let req = this.http.get<LoginUserContainer>(`${Config.API_URL}/admin/room/${roomId}/users`, this.jwt.httpOptions());
    return this.logger.handleRequest<LoginUserContainer>(req, ``, null);
  }

}
