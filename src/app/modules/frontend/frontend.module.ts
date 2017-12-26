import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { SecureComponent } from './secure/secure.component';
import { RoomComponent } from './room/room.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RoomsComponent } from './rooms/rooms.component';

import { SideNavBarModule } from "../side-nav-bar/side-nav-bar.module";
import { CoreModule } from "../../core/core.module";
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { WriterMessageComponent } from './writer-message/writer-message.component';
import { RoomUserListComponent } from './room-user-list/room-user-list.component';
import { MyRoomsComponent } from './my-rooms/my-rooms.component';
import { MyChatsComponent } from './my-chats/my-chats.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SideNavBarModule,
    CoreModule
  ],
  declarations: [SecureComponent, RoomComponent, HeaderComponent, FooterComponent, RoomsComponent, ChatMessageComponent, ChatHistoryComponent, WriterMessageComponent, RoomUserListComponent, MyRoomsComponent, MyChatsComponent]
})
export class FrontendModule { }
