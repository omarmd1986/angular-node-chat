import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtHandlerService } from './services/jwt-handler.service';
import { LoggerService } from './services/logger.service';
import { NavigateService } from './services/navigate.service';
import { AuthGuard } from './guards/auth.guard';
import { PusherService } from './services/pusher.service';
import { RoomService } from './services/room.service';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { LoggerComponent } from './logger/logger.component';
import { LoaderService } from './services/loader.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [RoomsListComponent, LoggerComponent],
  exports: [RoomsListComponent, LoggerComponent],
  providers: [JwtHandlerService, LoggerService, NavigateService, AuthGuard, PusherService, RoomService, UserService, MessageService, LoaderService]
})
export class CoreModule { }
