import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {
  PusherService
  , PusherMessage
  , UserService
  , Room
  , RoomService
  , JwtHandlerService
  , NavigateService
  , LoggerService
  , pusherFnEvents
  , MessagesService
  , LoginUser
  , LoginUserContainer
}
  from "../../../core";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit, OnDestroy {

  roomId: any;
  room: Room;
  buffer: PusherMessage[] = [];

  me: any;
  userBuffer: LoginUserContainer = new LoginUserContainer();
  /**
   * Pusher channel
   */
  private _channel;

  constructor(
    private route: ActivatedRoute,
    private pusher: PusherService,
    private userSrc: UserService,
    private roomSrc: RoomService,
    private loggerSrc: LoggerService,
    private jwt: JwtHandlerService,
    private navigate: NavigateService,
    private messageSrc: MessagesService
  ) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.me = this.jwt.user();

    /* Subscribe the login user to the room. */
    /* If the API return an error. the user isn't subscriber. */
    /* After the API return success, subscribes to the pusher, and the download the previous messages. */

    this.userSrc.addRoom(this.roomId).subscribe(room => {
      this.room = room;
      if (room == null) {
        return this.navigate.go('/rooms');
      }

      // Loading room info
      this.roomSrc.room(this.roomId).subscribe(room => this.room = room);

      // Subscriber to the pusher events
      this._pusherFn();

    });

  }

  ngOnDestroy(): void {
    // disconnect the user
    this.pusher.closeChannel(this._channel.name);
  }

  // Configure the channel
  private _pusherFn = function () {
    let self = this;

    // Callbacks
    let cbs = new pusherFnEvents();

    // Getting all online users in this room
    cbs.subscription_succeeded = (members: any) => {
      self.loggerSrc.add(`${members.count} users online in this room`, 'info');
      members.each(function (member) {
        self.userBuffer.push(LoginUser.parse(member.info));
      });
    }

    // Adding new users to the list
    cbs.member_added = (member: any) => {
      let u = LoginUser.parse(member.info);
      self.loggerSrc.add(`${u.name} has joined the room`, 'info');
      self.userBuffer.push(u)
    };

    // Remove a member
    cbs.member_remove = (member: any) => {
      let u = LoginUser.parse(member.info);
      self.loggerSrc.add(`${u.name} has left the room`, 'info');
      self.userBuffer.remove(member.id)
    };

    // Callback to get the messages
    cbs.message_event = (data: PusherMessage) => self.buffer.push(data);

    self._channel = this.pusher.subscriberRoom(this.roomId, cbs);
  };

  send(text: any): void {
    this.messageSrc.send(this.roomId, text.value).subscribe(res => {
      console.log(res);
    });
    text.value = '';
  }

  keyUp($event: KeyboardEvent, text: any): void {
    if ($event.keyCode == 13) {
      this.send(text);
    } // enter key code
  }

}
