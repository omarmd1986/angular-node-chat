import { Container } from "./container";

export class LoginUser {
    id: string;
    name: string;
    photo: string;
    socialID: string;
    is_admin: boolean;
    is_mod: boolean;

    constructor(data?: any) {
        if (!data) { return; }

        this.id = data._id || data.id;
        this.name = data.username || data.name;
        this.photo = data.picture || data.photo;
        this.socialID = data.socialId || data.socialID;
        this.is_admin = data.is_admin || false;
        this.is_mod = data.is_mod || false;
    }

    title(): string{
        return this.is_admin ? 'Admin' : this.is_mod ? 'Moderator' : '';
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

export class LoginUserContainer extends Container<LoginUser>{ }
