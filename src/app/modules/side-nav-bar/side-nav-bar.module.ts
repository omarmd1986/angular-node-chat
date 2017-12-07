import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { MenuComponent } from './menu/menu.component';
import { MenuService } from './menu.service';
import { Item } from "./item";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [MenuComponent],
  exports:[MenuComponent]
})

export class SideNavBarModule {

  static forRoot(items: Item[]): ModuleWithProviders{
    return {
      ngModule: SideNavBarModule,
      providers: [{
        provide: MenuService,
        useValue: new MenuService(items)
      }]
    }
  }

}
