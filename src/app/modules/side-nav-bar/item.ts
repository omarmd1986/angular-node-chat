abstract class menuItem {
    text: string;
    href: string;
    icon: string;
}
export class SubItem extends menuItem { }
export class Item extends menuItem { childs: SubItem[] }
