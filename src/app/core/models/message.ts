import { Output, EventEmitter } from "@angular/core";

import { Config } from "../config/config";
import { clearTimeout, setTimeout } from "timers";

export class Message {
    title: string;
    body: string;
    type: string = 'success';

    @Output() _clock: EventEmitter<Message> = new EventEmitter<Message>();

    private _selfDestroy: number = 0;
    private _cbRemoveMessage;
    private _timer: NodeJS.Timer = null;

    constructor(title, body, type) {
        this.title = title;
        this.body = body;
        this.type = type;

        this._calcSelfDestroy()
    }

    private _calcSelfDestroy(): void {
        switch (this.type.toLowerCase()) {
            case 'success':
            case 'info':
                this._selfDestroy = Config.messageSelfDestroy;
                break;
            default:
                this._selfDestroy = 0;
                break;
        }
        this.setClock();
    }

    private setClock(): void {

        if (this._selfDestroy > 0) {
            var self = this;
            clearTimeout(this._timer);
            self._timer = setTimeout(() => {
                self._clock.emit(this);
            }, this._selfDestroy);
        }
    }

}
