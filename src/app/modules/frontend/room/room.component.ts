import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomId: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');
  }

}
