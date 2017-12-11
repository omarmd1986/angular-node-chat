'use strict';

var Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

let messageSchema = new Schema({
    text: { type: Schema.Types.String, required: true },
    status: { type: Schema.Types.String },
    created_at: { type: Schema.Types.Date, default: Date.now }
});

var messageModel = Mongoose.model('message', messageSchema);

module.exports = messageModel;