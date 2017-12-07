import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { SecureComponent } from './secure/secure.component';
import { RoomComponent } from './room/room.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavBarModule } from "../side-nav-bar/side-nav-bar.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SideNavBarModule
  ],
  declarations: [SecureComponent, RoomComponent, HeaderComponent, FooterComponent]
})
export class FrontendModule { }
