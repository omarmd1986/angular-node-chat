import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';


import { Config } from "../config/config";
import { PusherMessage } from "../models/pusher-message";
// import { Config, PusherMessage } from "../index";

type MessageCallback = (data: PusherMessage) => any;

@Injectable()
export class PusherService {

  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher('b52baf92060e4ff1a3d3', {
      cluster: 'us2',
      encrypted: true
    });
  }

  subscriberRoom(channel: string, callback: MessageCallback): void {
    var channelObj = this.pusher.subscribe(channel);
    channelObj.bind('message', callback);
  }

}
