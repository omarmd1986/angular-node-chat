import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Core Module
import { CoreModule } from "./core/core.module";
import { AuthGuard } from "./core/guards/auth.guard";

// Login Module
import { LoginModule } from "./modules/login/login.module";
import { LoginComponent } from "./modules/login/login/login.component";
import { SecureComponent } from "./modules/login/secure/secure.component";
import { LoginCallbackComponent } from "./modules/login/login-callback/login-callback.component";

// Dashboar Module
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { DashboardComponent } from "./modules/dashboard/dashboard/dashboard.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'jwt/callback', component: LoginCallbackComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '', component: SecureComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  }
];

@NgModule({
  exports: [CoreModule, LoginModule, DashboardModule, RouterModule],
  imports: [CoreModule, LoginModule, DashboardModule, RouterModule.forRoot(routes)]
})

export class AppRoutingModule { }
