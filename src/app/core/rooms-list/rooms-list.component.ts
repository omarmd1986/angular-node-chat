import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../models/room';

@Component({
  selector: 'core-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  @Input('rooms') _rooms: [Room];

  constructor() { }

  ngOnInit() {
  }

}
