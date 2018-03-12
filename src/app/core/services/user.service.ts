import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { LoggerService } from "../services/logger.service";
import { JwtHandlerService } from "../services/jwt-handler.service";
import { LoginUser } from "../models/login-user";
import { Room, UserRoom, RoomContainer } from "../models/room";
import { Config } from "../config/config";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private jwt: JwtHandlerService,
    private logger: LoggerService
  ) { }

  /**
   * Getting the login user information.
   */
  me(): Observable<LoginUser> {
    let req = this.http.get<any>(`${Config.API_URL}/user/me`, this.jwt.httpOptions());
    return this.logger.handleRequest<LoginUser>(req, 'Getting personal information', null);
  }

  /**
   * Getting the login user's rooms
   */
  myRooms(): Observable<RoomContainer>{
    let req = this.http.get<any>(`${Config.API_URL}/user/me/rooms`, this.jwt.httpOptions());
    return this.logger.handleRequest<RoomContainer>(req, `Getting the login user's rooms`, null);
  }

  /**
   * Getting the login user's chats
   */
  myChats(): Observable<RoomContainer>{
    let req = this.http.get<any>(`${Config.API_URL}/user/me/chats`, this.jwt.httpOptions());
    return this.logger.handleRequest<RoomContainer>(req, `Getting the login user's chats`, null);
  }

  /**
   * Subscribe the room to the user.
   * @param roomId 
   */
  addRoom(roomId: String): Observable<UserRoom> {
    let req = this.http.post<UserRoom>(`${Config.API_URL}/user/room`, {room: roomId}, this.jwt.httpOptions());
    return this.logger.handleRequest<UserRoom>(req, 'Subscribe the room to the user.', null);
  }

  /**
   * Getting all the users.
   */
  users(): Observable<LoginUser[]> {
    let req = this.http.get<any>(`${Config.API_URL}/admin/user/`, this.jwt.httpOptions());
    return this.logger.handleRequest<LoginUser[]>(req, 'Getting all the users', []);
  }

  /**
   * Return the user information based on :id
   * @param userId 
   */
  user(userId: string): Observable<LoginUser> {
    let req = this.http.get<any>(`${Config.API_URL}/admin/user/${userId}`, this.jwt.httpOptions());
    return this.logger.handleRequest<LoginUser>(req, 'Getting personal information', null);
  }

  /**
   * Toggle the banned user's status
   * @param userId 
   */
  toggleBanned(userId: string): Observable<boolean> {
    let req = this.http.put<any>(`${Config.API_URL}/admin/user/${userId}/toggle/banned`, null, this.jwt.httpOptions());
    return this.logger.handleRequest<boolean>(req, `Toggle the banned user's status`, null);
  }

  /**
   * Toggle the muted user's status
   * @param userId 
   */
  toggleMuted(userId: string): Observable<boolean> {
    let req = this.http.put<any>(`${Config.API_URL}/admin/user/${userId}/toggle/muted`, null, this.jwt.httpOptions());
    return this.logger.handleRequest<boolean>(req, `Toggle the muted user's status`, null);
  }

  /**
   * Getting all the users' rooms
   * @param userId 
   */
  rooms(userId: string): Observable<RoomContainer> {
    let req = this.http.get<any>(`${Config.API_URL}/admin/user/${userId}/rooms`, this.jwt.httpOptions());
    return this.logger.handleRequest<RoomContainer>(req, `Getting all the users' rooms`, null);
  }

  /**
   * Getting the login user's chats
   */
  chats(userId: string): Observable<any>{
    let req = this.http.get<any>(`${Config.API_URL}/admin/user/${userId}/chats`, this.jwt.httpOptions());
    return this.logger.handleRequest<any>(req, `Getting all the user's chats`, null);
  }

  /**
   * Mark the loggin user as disconnect
   */
  disconnect(): Observable<any> {
    let req = this.http.put<any>(`${Config.API_URL}/user/disconnect`, null, this.jwt.httpOptions());
    return this.logger.handleRequest<any>(req, ``, null);
  }

  /**
   * Mark the loggin user as connected
   */
  connect(): Observable<any> {
    let req = this.http.put<any>(`${Config.API_URL}/user/connect`, null, this.jwt.httpOptions());
    return this.logger.handleRequest<any>(req, ``, null);
  }
}
