import { Component, OnInit, Input } from '@angular/core';
import { JwtHandlerService, PusherMessage } from '../../../core/index';


@Component({
  selector: 'frontend-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: PusherMessage;
  @Input() dateFormat: string = 'dddd, MMMM Do YYYY, h:mm:ss a';

  meMessage: boolean;

  constructor(
    private jwt: JwtHandlerService
  ) { }

  ngOnInit() {
    this.meMessage = (this.jwt.user().id == this.message.user._id);
  }

}
