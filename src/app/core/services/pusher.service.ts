import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

import { Config } from "../config/config";
import { PusherMessage } from "../models/pusher-message";

type MessageCallback = (data: PusherMessage) => any;

@Injectable()
export class PusherService {

  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher(Config.pusherAppId, Config.pusherOpts);
  }

  closeChannel(channel: string): void {
    this.pusher.unsubscribe(channel)
  }

  subscriberRoom(channel: string, callback: MessageCallback): void {
    var channelObj = this.pusher.subscribe(channel);
    channelObj.bind('message', callback);

    return channelObj;
  }

}
