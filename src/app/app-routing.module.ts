import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Core Module
import { CoreModule } from "./core/core.module";
import { AuthGuard } from "./core/guards/auth.guard";

// Side nav bar module
import { SideNavBarModule } from "./modules/side-nav-bar/side-nav-bar.module";
import { Item, SubItem } from "./modules/side-nav-bar/item";

// Login Module
import { LoginModule } from "./modules/login/login.module";
import { LoginComponent } from "./modules/login/login/login.component";
import { LoginCallbackComponent } from "./modules/login/login-callback/login-callback.component";

// Dashboar Module
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { DashboardComponent } from "./modules/dashboard/dashboard/dashboard.component";

// Frontend Module
import { FrontendModule } from "./modules/frontend/frontend.module";
import { SecureComponent } from "./modules/frontend/secure/secure.component";
import { RoomComponent } from "./modules/frontend/room/room.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'jwt/callback', component: LoginCallbackComponent },
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
  {text: 'Text1', icon: 'fa fa-user', href:'', childs:[
    {text: 'Text 32', href:'/test', icon:'fa fa-book'}
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
