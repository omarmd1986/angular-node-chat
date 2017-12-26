import { Component, OnInit } from '@angular/core';
import { UserService, RoomContainer } from '../../../core/index';

@Component({
  selector: 'app-my-chats',
  templateUrl: './my-chats.component.html',
  styleUrls: ['./my-chats.component.css']
})
export class MyChatsComponent implements OnInit {

  chats: RoomContainer

  constructor(
    private userSrc: UserService
  ) { }

  ngOnInit() {
  }

}
