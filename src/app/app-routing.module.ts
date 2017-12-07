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
import { FrontendModule, SecureComponent, RoomComponent } from "./modules/frontend/index";

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
      { path: 'room/:id', component: RoomComponent }
    ]
  },
  // 404 page redirect to dashboard to
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

const items: Item[] = [
  {text: 'Dashboard', icon: 'glyphicon glyphicon-home', href:'/dashboard', childs:[]},
  {text: 'Settings', icon: 'glyphicon glyphicon-cog', href:'', childs:[
    {text: 'Password', href:'/password', icon:'glyphicon glyphicon-leaf'}
  ]}
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
