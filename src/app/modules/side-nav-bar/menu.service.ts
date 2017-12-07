import { Injectable } from '@angular/core';
import { Item, SubItem } from "./item";

@Injectable()
export class MenuService {

  constructor(public items: Item[]) { }
 
}
