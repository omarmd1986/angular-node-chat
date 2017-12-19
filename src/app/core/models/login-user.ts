export class LoginUser {
    id: string;
    name: string;
    photo: string;
    socialID: string;

    constructor(data?: any) {
        if (!data) { return; }

        this.id = data._id || data.id;
        this.name = data.username || data.name;
        this.photo = data.picture || data.photo;
        this.socialID = data.socialId || data.socialID;
    }

    static parseArr(arr: any[]): LoginUser[] {
        let result: LoginUser[] = [];
        arr.forEach(obj => { result.push(new LoginUser(obj)); });
        return result;
    }

    static parse(obj: any): LoginUser {
        return new LoginUser(obj);
    }
}

export class LoginUserContainer {
    private values: LoginUser[] = [];

    constructor(values?: any[]) {
        if (!values) { return; }
        this.setValues(values);
    }

    setValues(values: any[]) {
        this.values = LoginUser.parseArr(values);
    }

    push(n: LoginUser): void {
        let index = this.find(n.id);
        if (index >= 0) { return; } // the user exists.
        this.values.push(n);
    }

    find(id: string): number {
        return this.values.findIndex(obj => { return obj.id === id });
    }

    remove(id: string): void {
        console.log(id)
        let index = this.find(id);
        if (index < 0) { return; }
        this.values.splice(index, 1);
    }

    getUsers(): LoginUser[] {
        return this.values;
    }
}
