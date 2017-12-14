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
    private message: MessagesService
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
        //show an error....
        return this.navigate.go('/rooms');
      } else {
        // Loading room info
        this.roomSrc.room(this.roomId).subscribe(room => this.room = room);
        let self = this;
        this.pusher.subscriberRoom(this.roomId, function (data: PusherMessage) {
          console.log(data.user._id, self.me.id);
          self.buffer.push(data);
        });
      }

    });

  }

  send(text: any): void {
+    this.message.send(this.roomId, text.value).subscribe(res => {
      console.log(res);
    });
    text.value = '';
  }

}
