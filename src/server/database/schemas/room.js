'use strict';

var Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

var RoomSchema = new Schema({
    title: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String },
    icon: { type: Schema.Types.String },
    settings: {type: Schema.Types.Mixed, default:{
        message_require_aproval: false, // Admin or moderator needs to aprove the messages.
        is_active: true, // Is the rooms active?
        is_private: false // False if is not private room. Array of users ID if is a private room. Private messages live here
    }},
    created_at: { type: Schema.Types.Date, default: Date.now },
    deleted_at: { type: Schema.Types.Date, default: null },

    //logs reference
    logs: [{type: Schema.Types.ObjectId, ref: 'room_log'}],
    
    //users references
    users: [{type: Schema.Types.ObjectId, ref: 'user_has_room'}]
});

// Methods
RoomSchema.methods.toggle = function(property){
    this.settings[property] = !this.settings[property];
    this.markModified('settings');
    return this;
};

// Virtual Properties
RoomSchema.virtual('is_activated').get(function(){
    return this.settings.is_active;
});

RoomSchema.virtual('is_private').get(function(){
    // could be an array of user.
    return this.settings.is_private !== false;
});

RoomSchema.virtual('is_message_require_aproval').get(function(){
    return this.settings.message_require_aproval;
});

// Rooms Log
let roomLogSchema = new Schema({
    action: {type: Schema.Types.String, required: true},
    date: {type: Schema.Types.Date, default: Date.now},
    
    // Room reference
    room: { type: Schema.Types.ObjectId, ref: 'room' },
});

var roomLogModel = Mongoose.model('room_log', roomLogSchema);
var roomModel = Mongoose.model('room', RoomSchema);

module.exports = roomLogModel;
module.exports = roomModel;