'use strict';

var Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

let messageSchema = new Schema({
    text: { type: Schema.Types.String, required: true },
    status: { type: Schema.Types.String, default: 'send' },
    userRoom: { type: Schema.Types.ObjectId, ref: 'user_has_room' },
    created_at: { type: Schema.Types.Date, default: Date.now }
});

var messageModel = Mongoose.model('message', messageSchema);

module.exports = messageModel;