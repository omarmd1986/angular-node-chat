import { Component, OnInit, Input } from '@angular/core';
import { PusherMessageContainer } from '../../../core/index';

@Component({
  selector: 'frontend-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit {

  @Input('buffer') buffer: PusherMessageContainer;

  constructor() { }

  ngOnInit() {
  }

}
