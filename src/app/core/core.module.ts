import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
import { ReadableTypePipe } from './pipes/readable-type.pipe';
import { MessagesService } from './services/messages.service';
import { FromUtcPipe } from './pipes/from-utc.pipe';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [RoomsListComponent, LoggerComponent, ReadableTypePipe, FromUtcPipe, UsersListComponent],
  exports: [RoomsListComponent, LoggerComponent, FromUtcPipe, UsersListComponent],
  providers: [JwtHandlerService, LoggerService, NavigateService, AuthGuard, PusherService, RoomService, UserService, MessageService, LoaderService, MessagesService]
})
export class CoreModule { }
