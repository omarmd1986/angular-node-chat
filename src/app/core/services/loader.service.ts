import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationError } from '@angular/router';

@Injectable()
export class LoaderService {

  loading: boolean = true;

  constructor(
    private router: Router
  ) { this.init() }

  private init(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loading = false;
      }
    });
  }

}
