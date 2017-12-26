import { Component, OnInit, Input } from '@angular/core';
import { LoginUserContainer, ActionContainer, Action, ActionType, LoginUser, RoomService, NavigateService, Room } from '../../../core/index';

@Component({
  selector: 'frontend-room-user-list',
  templateUrl: './room-user-list.component.html',
  styleUrls: ['./room-user-list.component.css']
})
export class RoomUserListComponent implements OnInit {

  @Input('users') _users: LoginUserContainer;
  @Input('user') _loginUser: LoginUser;
  _actions: ActionContainer = new ActionContainer();

  constructor(
    private roomSrc: RoomService,
    private navigateSrc: NavigateService
  ) { }

  ngOnInit() {
    this.fillActions();
  }

  private fillActions(): void {
    let privateChatAct = new Action();

    privateChatAct.text = 'Private message';
    privateChatAct.type = ActionType.action;
    privateChatAct.fn = ($event: any, user: LoginUser) => {
      this.roomSrc.privateMessage(user.id).subscribe(room => {
        room = Room.parseRoom(room);
        if (room == null) { return; } //Some error ocurred
        return this.navigateSrc.go(`/room/${room.id}`)
      });
    };

    this._actions.push(privateChatAct);
  }

}
