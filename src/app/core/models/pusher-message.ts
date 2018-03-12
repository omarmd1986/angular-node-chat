import { Container } from "./container";

export class PusherMessage {
    text: String;
    user: any;
    room: any;
    date: String;
}


export class PusherMessageContainer extends Container<PusherMessage>{ }

// User Notifications....
class PusherNewMessage {
    // User ID who send the message
    sendId: string;
    sendName: string;
}

export class PusherNewRoomMessage extends PusherNewMessage{
    roomId: number;
    roomTitle: string;
}

export class PusherNewChatMessage extends PusherNewMessage{
    chatId: number;
}

export class PusherRoomBannedMessage {
    roomId: string;
}