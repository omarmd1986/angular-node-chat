import { Component, OnInit, OnDestroy } from '@angular/core';
import { JwtHandlerService, PusherService, systemFnEvents, LoggerService, NavigateService } from "../../../core/index";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit, OnDestroy {

  user: any;
  private channel: any;

  constructor(
    private jwt: JwtHandlerService,
    private pusher: PusherService,
    private loggerSrc: LoggerService,
    private navigate: NavigateService
  ) { }

  ngOnInit() {
    this.user = this.jwt.user();

    this.systemEvents();
  }

  ngOnDestroy() {
    this.pusher.closeChannel(this.channel);
  }

  private systemEvents(): void {
    let fnEvents = new systemFnEvents();
    let self = this;

    fnEvents.banned_event = function () {
      self.loggerSrc.add(`You was banned in this server`, 'info');
      self.navigate.go('/logout');
    };

    fnEvents.subscription_error = function () {
      self.loggerSrc.add(`Cannot access to the system`, 'danger');
      self.navigate.go('/logout');
    };

    fnEvents.member_added = function (member: any) { };
    fnEvents.member_remove = function (member: any) { };
    fnEvents.subscription_succeeded = function (members: any) { };

    this.channel = this.pusher.subscriberSystem(this.user.id, fnEvents);
  }

}
