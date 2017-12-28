import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room, RoomContainer } from '../models/room';
import { ActionType, ActionContainer } from '../models/action';

@Component({
  selector: 'core-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  @Input('chats') _chats: RoomContainer;
  @Input('actions') _actions: ActionContainer;
  @Output('click') _emitter: EventEmitter<Room> = new EventEmitter();
  ActionType: ActionType;


  constructor() { }

  ngOnInit() {
  }

  click(room: Room): void{
    this._emitter.emit(room);
  }

}
