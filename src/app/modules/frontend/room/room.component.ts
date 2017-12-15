import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PusherService, PusherMessage, UserService, Room, RoomService, JwtHandlerService, NavigateService, LoggerService, MessagesService }
  from "../../../core";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {

  roomId: any;
  room: Room;
  buffer: PusherMessage[] = [];
  me;

  constructor(
    private route: ActivatedRoute,
    private pusher: PusherService,
    private userSrc: UserService,
    private roomSrc: RoomService,
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
      } else {
        // Loading room info
        this.roomSrc.room(this.roomId).subscribe(room => this.room = room);
        // Loading the messages
        this.messageSrc.fetch(this.roomId).subscribe(messages => {
          this.buffer = messages;
          let self = this;
          // Now subscribe to get WS messages...
          this.pusher.subscriberRoom(this.roomId, function (data: PusherMessage) {
            self.buffer.push(data);
          });
        });
      }
    });

  }

  send(text: any): void {
    this.messageSrc.send(this.roomId, text.value).subscribe(res => {
      console.log(res);
    });
    text.value = '';
  }

}
