import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Injectable()
export class NavigateService {

  constructor(
    private location: Location,
    private router: Router
  ) { }

  go(url: string): void{
    // clean the back history
    this.location.replaceState('/');
    // navigate to login page
    this.router.navigate([url])
  }

}
