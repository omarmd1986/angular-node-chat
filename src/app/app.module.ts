import { BrowserModule }      from '@angular/platform-browser';
import { NgModule }           from '@angular/core';
import { FormsModule }        from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }   from '@angular/common/http'; // <-- For http calls

import { AppComponent } from './app.component';

// My Modules
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule }       from "./core/core.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
