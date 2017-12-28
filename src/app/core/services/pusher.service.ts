import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

import { Config } from "../config/config";
import { JwtHandlerService } from "./jwt-handler.service";
import { UserService } from "./user.service";
import { PusherMessage } from "../models/pusher-message";
import { LoginUser } from '../models/login-user';

export class pusherFnEvents {
  subscription_succeeded: (members: any[]) => any;
  subscription_error: (status: number) => any;
  member_added: (member: any) => any;
  member_remove: (member: any) => any;
}

export class roomFnEvents extends pusherFnEvents{
  message_event: (data: PusherMessage) => any;
}

export class systemFnEvents extends pusherFnEvents{
  banned_event: () => any;

  //keep going adding more events
  // Ex new message in a chat, new message in a room, user was banned from the server or the room
}

@Injectable()
export class PusherService {

  private pusher: Pusher;

  constructor(
    private jwt: JwtHandlerService,
    private userSrc: UserService
  ) {
    // Pass the token to auth endpoint
    // JSONp auth type do not admit pass headers to the server
    // Passing it as url parameter
    Config.pusherOpts.authEndpoint += `/${this.jwt.getJwt()}`;
    this.pusher = new Pusher(Config.pusherAppId, Config.pusherOpts);
  }

  closeChannel(channel: any): void {
    this.pusher.unsubscribe(channel.name);
    if(channel.name.split('-')[2] == 'system'){
      this.userSrc.disconnect().subscribe(_ => {});
    }
  }

  /**
   * 
   * @param channel 
   * @param fns 
   * @param callback 
   */
  subscriberRoom(channel: string, fns: roomFnEvents): any {
    var channelObj = this.pusher.subscribe(`presence-${channel}-room`);

    // Binding events....
    channelObj.bind('pusher:member_added', fns.member_added);
    channelObj.bind('pusher:member_removed', fns.member_remove);
    channelObj.bind('pusher:subscription_succeeded', fns.subscription_succeeded);
    channelObj.bind('pusher:subscription_error', fns.subscription_error);

    // Binding messages
    channelObj.bind('message', fns.message_event);

    return channelObj;
  }

  /**
   * 
   * @param channel 
   * @param fns 
   * @param callback 
   */
  subscriberSystem(channel: string, fns: systemFnEvents): any {
    var channelObj = this.pusher.subscribe(`presence-${channel}-system`);

    // Binding events....
    channelObj.bind('pusher:member_added', fns.member_added);
    channelObj.bind('pusher:member_removed', fns.member_remove);
    channelObj.bind('pusher:subscription_succeeded', fns.subscription_succeeded);
    channelObj.bind('pusher:subscription_error', fns.subscription_error);

    // Binding custom events
    channelObj.bind('banned', fns.banned_event);

    return channelObj;
  }

}
