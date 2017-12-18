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
