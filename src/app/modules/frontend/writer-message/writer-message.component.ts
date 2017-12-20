import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ChatMessage } from "../../../core";

@Component({
  selector: 'frontend-writer-message',
  templateUrl: './writer-message.component.html',
  styleUrls: ['./writer-message.component.css']
})
export class WriterMessageComponent implements OnInit {
  
  @Output('send') sendEmitter: EventEmitter<ChatMessage> = new EventEmitter<ChatMessage>();

  constructor() { }

  ngOnInit() {
  }

  public send(text: any){
    this.sendEmitter.emit(new ChatMessage(text.value));
    text.value = '';
  }

  keyUp($event: KeyboardEvent, text: any): void {
    if ($event.keyCode == 13) {
      this.send(text);
    } // enter key code
  }
}
