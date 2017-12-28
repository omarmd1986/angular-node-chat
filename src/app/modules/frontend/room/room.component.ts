import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Injector } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {
  PusherService
  , PusherMessage
  , PusherMessageContainer
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
  , ChatMessage
  , Scroll
  , ActionContainer
  , Action
  , roomFnEvents
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
  buffer: PusherMessageContainer = new PusherMessageContainer();

  me: LoginUser | null;
  userBuffer: LoginUserContainer = new LoginUserContainer();

  actions: ActionContainer;
  /**
   * Pusher channel
   */
  private _channel;

  @ViewChild('chatUsers') chatUsers: ElementRef;
  @ViewChild('chatHistory') chatHistory: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private pusher: PusherService,
    private userSrc: UserService,
    private roomSrc: RoomService,
    private loggerSrc: LoggerService,
    private jwt: JwtHandlerService,
    private navigate: NavigateService,
    private messageSrc: MessagesService,
    private injector: Injector
  ) { }

  ngOnInit() {

    this.roomId = this.route.snapshot.paramMap.get('id');
    this.me = this.jwt.user();

    /* Subscribe the login user to the room. */
    /* If the API return an error. the user isn't subscriber. */
    /* After the API return success, subscribes to the pusher, and the download the previous messages. */

    this.userSrc.addRoom(this.roomId).subscribe(room => {
      if (room == null) { return this.navigate.go('/rooms'); }

      this.me.is_mod = room.is_mod || false;

      this.room = room.room || null;

      // Subscriber to the pusher events
      this._pusherFn();
    });

  }

  ngOnDestroy(): void {
    // disconnect the user
    this.pusher.closeChannel(this._channel);
  }

  private _loadMessages(): void {
    var self = this;
    this.messageSrc.fetch(this.roomId).subscribe(messages => {
      messages.forEach(m => this.buffer.push(m));
      Scroll.scrollToBottom(self.chatHistory);
    });
  }

  // Configure the channel
  private _pusherFn = function () {
    let self = this;

    // Callbacks
    let cbs = new roomFnEvents();

    // Getting all online users in this room
    cbs.subscription_succeeded = (members: any) => {
      // Loading previos messages
      // Load the messages
      this._loadMessages();

      self.loggerSrc.add(`${members.count} users online in this room`, 'info');
      members.each(function (member) {
        self.userBuffer.push(LoginUser.parse(member.info));
      });
    }

    cbs.subscription_error = (status: number) => {
      self.loggerSrc.add(`Cannot access to this room`, 'danger');
      self.navigate.go('/rooms')
    };

    // Adding new users to the list
    cbs.member_added = (member: any) => {
      let u = LoginUser.parse(member.info);
      self.loggerSrc.add(`${u.name} has joined the room`, 'info');
      self.userBuffer.push(u)
      Scroll.scrollToBottom(self.chatUsers);
    };

    // Remove a member
    cbs.member_remove = (member: any) => {
      let u = LoginUser.parse(member.info);
      self.loggerSrc.add(`${u.name} has left the room`, 'info');
      self.userBuffer.remove(u);
    };

    // Callback to get the messages
    cbs.message_event = (data: PusherMessage) => {
      self.buffer.push(data);
      Scroll.scrollToBottom(self.chatHistory);
    }

    self._channel = this.pusher.subscriberRoom(this.roomId, cbs);
  };

  send(text: ChatMessage): void {
    this.messageSrc.send(this.roomId, text.text).subscribe(res => { });
  }
}
