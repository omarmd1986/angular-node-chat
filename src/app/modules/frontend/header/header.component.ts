import { Component, OnInit } from '@angular/core';
import { JwtHandlerService } from "../../../core/index";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  private isActive: boolean = false;

  constructor(
    private jwt: JwtHandlerService
  ) {
    this.user = this.jwt.user();
  }

  ngOnInit() { }
}
