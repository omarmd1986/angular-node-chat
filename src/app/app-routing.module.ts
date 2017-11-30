import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Creating the first Route
import { LoginModule } from "./modules/login/login.module";
import { LoginComponent } from "./modules/login/login/login.component";
import { SecureComponent } from "./modules/login/secure/secure.component";
import { LoginCallbackComponent } from "./modules/login/login-callback/login-callback.component";

import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { DashboardComponent } from "./modules/dashboard/dashboard/dashboard.component";

// import { HeroesComponent }      from './components/heroes/heroes.component';
// import { DashboardComponent }      from './components/dashboard/dashboard.component';
// import { HeroDetailComponent }      from './components/hero-detail/hero-detail.component';
// import { HeroRemoveComponent }  from './components/hero-remove/hero-remove.component';
// import { DataBindingComponent }  from './components/data-binding/data-binding.component';
// import { UserInputComponent } from './components/user-input/user-input.component';
// import { FormsInputComponent } from './components/forms-input/forms-input.component';
// import { FormValidattionComponent } from './components/form-validattion/form-validattion.component'


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'jwt/callback', component: LoginCallbackComponent },
  { path: '', component: SecureComponent, children:[
    { path: 'dashboard', component: DashboardComponent }
  ] },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'delete/:id', component: HeroRemoveComponent },
  // { path: 'binding', component: DataBindingComponent },
  // { path: 'input', component: UserInputComponent },
  // { path: 'forms', component: FormsInputComponent },
  // { path: 'validate', component: FormValidattionComponent },
  
  //Defualt Route
  // { path: '', redirectTo: 'secure/dashboard', pathMatch: 'full' },
];

@NgModule({
  exports: [ LoginModule, DashboardModule, RouterModule ],
  imports: [ LoginModule, DashboardModule, RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
