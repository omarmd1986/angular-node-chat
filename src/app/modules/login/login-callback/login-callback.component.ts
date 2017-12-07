import { Component, OnInit } from '@angular/core';

/**
 * The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent. 
 * This component is interested in the route's bag of parameters extracted from the URL. 
 * The "id" parameter is the id of the hero to display.
 */
import { ActivatedRoute, Params } from '@angular/router';

import { JwtHandlerService, NavigateService } from "../../../core/index";

@Component({
  template: ''
})
export class LoginCallbackComponent implements OnInit {

  private token: string|null = null;

  constructor(
    private route: ActivatedRoute,
    private jwt: JwtHandlerService,
    private navigate: NavigateService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((value: Params) => {
      // try to get the token.
      this.token = value.token;
      if(!this.token){
        // go to login page
        this.navigate.go('/login');
        return;
      }
      // set the jwt token for api request
      this.jwt.setJwt(this.token);
      // navigate to defaul page
      this.navigate.go('');  
    });
  }

}
