import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http'; // <-- For http calls

import { AppComponent } from './app.component';

import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

// My Modules
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),

    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.circleSwish,
      // backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      // backdropBorderRadius: '4px',
      // primaryColour: '#ffffff',
      // secondaryColour: '#ffffff',
      // tertiaryColour: '#ffffff'
    }),

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
