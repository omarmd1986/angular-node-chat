import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PusherService, PusherMessage, UserService, Room } from "../../../core";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {

  roomId: any;

  constructor(
    private route: ActivatedRoute,
    private pusher: PusherService,
    private userSrc: UserService
  ) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');

    this.userSrc.addRoom(this.roomId).subscribe((room: Room) => {
      if(room == null){
      
      }else{

      }
    });

    /* Subscribe the login user to the room. */
    /* If the API return an error. the user isn't subscriber. */
    /* After the API return success, subscribes to the pusher, and the download the previous messages. */

    this.pusher.subscriberRoom(this.roomId, function(data: PusherMessage){
      console.log(data);
    });
  }

}
