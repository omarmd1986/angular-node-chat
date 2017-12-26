import { Container } from "./container";

export class Room {
    title: string;
    description: string;
    icon: string;
    id: string;


    static parseRoom(obj: any): Room {
        var r = new Room();
        r.title = obj.title || '';
        r.description = obj.description || '';
        r.icon = obj.icon || '';
        r.id = obj.id || obj._id || obj.ID || null;
        return r;
    }

}

export class RoomContainer extends Container<Room>{

}

export class UserRoom {
    _id: string;
    room: Room;
    settings: any;
    forbidden: any;
    is_mod: boolean;
}
