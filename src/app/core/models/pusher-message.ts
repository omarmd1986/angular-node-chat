import { LoginUser } from "../models/login-user";
import { Room } from "../models/room";

// import { LoginUser, Room } from "../index";

export class PusherMessage {
    text: String;
    user: LoginUser;
    room: Room;
    date: String;
}
