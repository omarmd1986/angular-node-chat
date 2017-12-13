import { Component } from '@angular/core';

import { LoaderService } from "./core/index";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    public loader: LoaderService
  ){ }
}
