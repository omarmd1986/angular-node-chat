import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

import { Config } from "../config/config";
import { JwtHandlerService } from "./jwt-handler.service";
import { PusherMessage } from "../models/pusher-message";
import { LoginUser } from '../models/login-user';

export class pusherFnEvents {
  subscription_succeeded: (members: any[]) => any;
  member_added: (member: any) => any;
  member_remove: (member: any) => any;
  message_event: (data: PusherMessage) => any;
}

@Injectable()
export class PusherService {

  private pusher: Pusher;

  constructor(
    private jwt: JwtHandlerService
  ) {
    // Pass the token to auth endpoint
    // JSONp auth type do not admit pass headers to the server
    // Passing it as url parameter
    Config.pusherOpts.authEndpoint += `/${this.jwt.getJwt()}`;
    this.pusher = new Pusher(Config.pusherAppId, Config.pusherOpts);
  }

  closeChannel(channel: string): void {
    this.pusher.unsubscribe(channel)
  }

  /**
   * 
   * @param channel 
   * @param fns 
   * @param callback 
   */
  subscriberRoom(channel: string, fns: pusherFnEvents): any {
    var channelObj = this.pusher.subscribe(`presence-${channel}`);

    // Binding events....
    channelObj.bind('pusher:member_added', fns.member_added);
    channelObj.bind('pusher:member_removed', fns.member_remove);
    channelObj.bind('pusher:subscription_succeeded', fns.subscription_succeeded);

    // Binding messages
    channelObj.bind('message', fns.message_event);

    return channelObj;
  }

}
