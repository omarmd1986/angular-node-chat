import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from '../models/room';

@Component({
  selector: 'core-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  @Input('rooms') _rooms: [Room];
  @Output('pick') _click: EventEmitter<Room> = new EventEmitter<Room>();

  constructor() { }

  ngOnInit() {
  }

  click(room: Room): void{
    this._click.emit(room);
  }

}
