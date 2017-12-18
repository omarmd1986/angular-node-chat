import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LoginUser } from "../models/login-user";

@Component({
  selector: 'core-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input('users') _users: LoginUser[] = [];
  @Output('pick') _pick: EventEmitter<LoginUser> = new EventEmitter<LoginUser>();

  constructor() { }

  ngOnInit() {
  }

  click(user: LoginUser): void {
    this._pick.emit(user);
  }

}
