import { Component, OnInit } from '@angular/core';
import { JwtHandlerService } from "../../../core/index";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  user: any;

  constructor(
    private jwt: JwtHandlerService
  ) { }

  ngOnInit() { 
    this.user = this.jwt.user();
  }

}
