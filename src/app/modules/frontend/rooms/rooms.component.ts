import { Component, OnInit } from '@angular/core';

import { UserService, RoomService, Room, LoginUser } from "../../../core/index";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  myRooms: [Room];
  publicRooms: [Room];

  constructor(
    private userSrc: UserService,
    private roomSrc: RoomService
  ) { }

  ngOnInit() {
    this.init();
  }

  private init(): void{
    this.userSrc.myRooms().subscribe((rooms: [Room] | null) => {
      if(rooms == null){
        // Some error...
      }else{
        this.myRooms = rooms;
      }
    });

    this.roomSrc.rooms().subscribe((rooms: [Room] | null) => {
      if(rooms == null){
        // some error
      }else{
        this.publicRooms = rooms;
      }
    });
  }
}
