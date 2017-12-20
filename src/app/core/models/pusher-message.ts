import { Container } from "./container";

export class PusherMessage {
    text: String;
    user: any;
    room: any;
    date: String;
}


export class PusherMessageContainer extends Container<PusherMessage>{
    
}