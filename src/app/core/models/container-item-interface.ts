
export class ContainerItemInterface<T> {
    data: T;
    next: ContainerItemInterface<T>;

    constructor(data: T) { this.data = data; }
}
