'use strict';

var Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

let userHasRoomsSchema = new Schema({
    // User reference
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    // Room reference
    room: { type: Schema.Types.ObjectId, ref: 'room' },
    // Messages reference
    messages: [{type: Schema.Types.ObjectId, ref: 'message'}],
    
    //Is moderator
    is_mod: { type: Schema.Types.Boolean, default: false },
    // To room level
    forbidden: {type: Schema.Types.Mixed, default: {is_ban: false, is_mute: false}},
    
    settings: {
        type: Schema.Types.Mixed, default: {
            recive_updates: true // If the user wants to revive updates in Push notifications
        }
    }
});

userHasRoomsSchema.methods.addMessage = function(message){
    return this.messages.push(message);
}

let userHasRoomModel = Mongoose.model('user_has_room', userHasRoomsSchema);

module.exports = userHasRoomModel;