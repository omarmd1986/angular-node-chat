import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { JwtHandlerService } from "../../../core/services/jwt-handler.service";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  isLogin: boolean;

  constructor(
    private location: Location,
    private router: Router,
    private jwt: JwtHandlerService
  ) {
    this.isLogin = false;
  }

  ngOnInit() {
    //Here we can check is the user has loggin or not.
    this.jwt.isLoggin().subscribe((value: boolean) => {
      this.isLogin = value;
      if(!value){
        // Clean the back history
        this.location.replaceState('/');
        // Force to navigate to login page.
        this.router.navigate(['login']);  
      }
    });

  }

}
