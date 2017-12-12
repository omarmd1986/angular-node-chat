import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PusherService, PusherMessage } from "../../../core";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {

  roomId: any;

  constructor(
    private route: ActivatedRoute,
    private pusher: PusherService
  ) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');
    /* Subscribe the login user to the room. */
    /* If the API return an error. the user isn't subscriber. */
    /* After the API return success, subscribes to the pusher, and the download the previous messages. */

    this.pusher.subscriberRoom(this.roomId, function(data: PusherMessage){
      console.log(data);
    });
  }

}
