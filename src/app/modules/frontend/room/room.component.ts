import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import Pusher from 'pusher-js';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {

  roomId: any;
  pusher: Pusher;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');

    this.pusher = new Pusher('b52baf92060e4ff1a3d3', {
      cluster: 'us2',
      encrypted: true
    });

    var channel = this.pusher.subscribe(this.roomId);
    channel.bind('message', function (data) {
      console.log(data)
      alert(data);
    });

  }

}
