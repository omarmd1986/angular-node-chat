import { ContainerItemInterface } from "./container-item-interface";
import { isObject } from "util";

export class Container<T>{

    private head: ContainerItemInterface<T> = null;

    push(data: T): void {
        if (this.head === null) {
            this.head = new ContainerItemInterface<T>(data);
            return;
        }
        let index = this.head;
        while (index.next) { index = index.next; }
        index.next = new ContainerItemInterface<T>(data);
    }

    has(obj: T): boolean {
        let index = this.head;
        let equal = false;
        while (index && !equal) {
            equal = (JSON.stringify(obj) === JSON.stringify(index.data));
            index = index.next;
        }
        return equal;
    }

    remove(obj: T): boolean {
        if (this.head == null) { return false; }

        let equal = (JSON.stringify(obj) === JSON.stringify(this.head.data));

        if (equal) {
            this.head = this.head.next;
            return true;
        }

        let index = this.head.next,
            current = this.head;

        while (index && !equal) {
            equal = (JSON.stringify(obj) === JSON.stringify(index.data));
            if (equal) { break; }
            current = index;
            index = index.next;
        }
        if (!index) { return false; }

        current.next = index.next;
        return true;
    }

    batch(values: T[]): void {
        values.forEach(v => this.push(v));
    }

    clean(): void {
        this.head = null;
    }

    lenght(): number {
        let lenght = 0;
        let index = this.head;
        while (index) {
            lenght++;
            index = index.next;
        }
        return lenght;
    }
}

Container.prototype[Symbol.iterator] = function* () {
    var self = this;
    var index = self.head;

    while (index) {
        yield index.data;
        index = index.next;
    }
}
