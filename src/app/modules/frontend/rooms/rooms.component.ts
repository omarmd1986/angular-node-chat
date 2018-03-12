import { Component, OnInit } from '@angular/core';

import { UserService, RoomService, Room, LoginUser, NavigateService, RoomContainer } from "../../../core/index";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  myRooms: RoomContainer;
  publicRooms: RoomContainer;

  constructor(
    private userSrc: UserService,
    private roomSrc: RoomService,
    private navigateSrc: NavigateService
  ) { }

  ngOnInit() {
    this.init();
  }

  private init(): void{
    this.userSrc.myRooms().subscribe((rooms: RoomContainer) => this.myRooms = rooms);
    this.roomSrc.roomsPublic().subscribe((rooms: RoomContainer) => this.publicRooms = rooms);
  }

  goRoom($room: any): void{
    this.navigateSrc.go(`/room/${$room._id}`)
  }
}
