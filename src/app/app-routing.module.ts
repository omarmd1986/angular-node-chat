import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Core Module
import { CoreModule, AuthGuard } from "./core/index";

// Side nav bar module
import { SideNavBarModule, Item, SubItem } from "./modules/side-nav-bar/index";

// Login Module
import { LoginModule, LoginComponent, LoginCallbackComponent, LogoutComponent } from "./modules/login/index";

// Dashboar Module
import { DashboardModule, DashboardComponent } from "./modules/dashboard/index";

// Frontend Module
import { FrontendModule, SecureComponent, RoomsComponent, RoomComponent, MyChatsComponent, MyRoomsComponent } from "./modules/frontend/index";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'jwt/callback', component: LoginCallbackComponent },
  { path: 'logout', component: LogoutComponent },
  //Default page
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // Secure frontend pages
  {
    path: '', component: SecureComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'my/rooms', component: MyRoomsComponent },
      { path: 'my/chats', component: MyChatsComponent },
      { path: 'room/:id', component: RoomComponent }
    ]
  },
  // 404 page redirect to dashboard to
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

const items: Item[] = [
  {text: 'Dashboard', icon: 'glyphicon glyphicon-home', href:'/dashboard', childs:[]},
  {text: 'Rooms', icon: 'glyphicon glyphicon-align-justify', href:'/rooms', childs:[]},
  {text: 'My Rooms', icon: 'glyphicon glyphicon-th-large', href:'/my/rooms', childs:[]},
  {text: 'My Chats', icon: 'glyphicon glyphicon-envelope', href:'/my/chats', childs:[]},
];

@NgModule({
  exports: [
    CoreModule,
    LoginModule,
    DashboardModule,
    FrontendModule,
    RouterModule,
    SideNavBarModule
  ],

  imports: [CoreModule,
    LoginModule,
    DashboardModule,
    FrontendModule,
    RouterModule.forRoot(routes),
    SideNavBarModule.forRoot(items)
  ]
})

export class AppRoutingModule { }
