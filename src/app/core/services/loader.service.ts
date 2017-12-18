import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationError } from '@angular/router';

@Injectable()
export class LoaderService {

  private _loading: boolean = false;
  private _count: number = 0;

  constructor(
    private router: Router
  ) { }

  private init(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd || event instanceof NavigationError) {

      }
    });
  }

  loading(): boolean{
    return this._loading;
  }

  show(): void{
    if(this._count == 0){
      this._loading = true;
    }
    this._count++;
  }

  stop(): void{
    this._count--;
    if(this._count == 0){
      this._loading = false;
    }
    
  }

}
