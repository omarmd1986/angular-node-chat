import { Container } from "./container";
import { LoginUser } from "./login-user";

export enum ActionType{
    action = 1
    , separator = 2
    , link = 3
}

export class Action {
    text: string;
    url: string;
    icon: string;
    fn: ($event: any, user: LoginUser) => any;
    type: ActionType
}

export class ActionContainer extends Container<Action>{

}
