import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LoginUser, LoginUserContainer } from "../models/login-user";
import { Action, ActionContainer, ActionType } from '../models/action';

@Component({
  selector: 'core-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input('users') _users: LoginUserContainer;
  @Input('actions') _actions: ActionContainer;
  @Output('pick') _pick: EventEmitter<LoginUser> = new EventEmitter<LoginUser>();
  ActionType = ActionType;

  constructor() { }

  ngOnInit() { }

  click(user: LoginUser): void {
    this._pick.emit(user);
  }

}
