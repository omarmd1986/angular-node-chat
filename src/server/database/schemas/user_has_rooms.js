'use strict';

var Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

let userHasRoomsSchema = new Schema({
    // User reference (To if is a chat)
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    // User reference (from if is a chat)
    from: { type: Schema.Types.ObjectId, ref: 'user', default: null },
    // Room reference
    room: { type: Schema.Types.ObjectId, ref: 'room', default: null },
    // Messages reference
    messages: [{type: Schema.Types.ObjectId, ref: 'message'}],
    
    //Is moderator
    is_mod: { type: Schema.Types.Boolean, default: false },
    // To room level
    forbidden: {type: Schema.Types.Mixed, default: {is_ban: false, is_mute: false}},
    
    create_at: {type: Schema.Types.Date, default: Date.now},

    settings: {
        type: Schema.Types.Mixed, default: {
            recive_updates: true // If the user wants to revive updates in Push notifications
        }
    }
});

userHasRoomsSchema.methods.addMessage = function(message){
    return this.messages.push(message);
}

// Methods
UserSchema.methods.toggleUpdates = function(property){
    this.settings.recive_updates = !this.settings.recive_updates;
    this.markModified('settings');
    return this;
};

// Virtual Properties
userHasRoomsSchema.virtual('is_banned').get(function(){
    return this.forbidden.is_ban;
});

userHasRoomsSchema.virtual('is_muted').get(function(){
    return this.forbidden.is_mute;
});

let userHasRoomModel = Mongoose.model('user_has_room', userHasRoomsSchema);

module.exports = userHasRoomModel;