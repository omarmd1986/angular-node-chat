import { ElementRef } from "@angular/core";

export class Scroll {

    static scrollToBottom(ele: ElementRef, time?: number) {
        setTimeout(() => {
            try {
                ele.nativeElement.scrollTop = ele.nativeElement.scrollHeight    
            } catch (error) { console.log(error) }
        }, time || 500);
    }

    static scrollToTop(ele: ElementRef, time?: number) {
        setTimeout(() => {
            try {
                ele.nativeElement.scrollTop = 0;    
            } catch (error) { console.log(error) }
        }, time || 500);
    }
}
