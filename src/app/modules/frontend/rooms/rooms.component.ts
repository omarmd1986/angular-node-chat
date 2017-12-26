import { Component, OnInit } from '@angular/core';

import { UserService, RoomService, Room, LoginUser, NavigateService } from "../../../core/index";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  publicRooms: Room[];

  constructor(
    private userSrc: UserService,
    private roomSrc: RoomService,
    private navigateSrc: NavigateService
  ) { }

  ngOnInit() {
    this.init();
  }

  private init(): void{
    this.roomSrc.roomsPublic().subscribe((rooms: Room[]) => this.publicRooms = rooms);
  }

  goRoom($room: any): void{
    this.navigateSrc.go(`/room/${$room._id}`)
  }
}
