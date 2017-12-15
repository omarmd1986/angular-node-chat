'use strict';

var Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

var config = require('../../config');

let UserSchema = new Schema({
    username: { type: Schema.Types.String, required: true },
    socialId: { type: Schema.Types.String, required: true },
    provider: { type: Schema.Types.String, required: true },
    picture: { type: Schema.Types.String, default: config.default_user_picture },
    
    is_admin: { type: Schema.Types.Boolean, default: false, required: true },
    forbidden: {type: Schema.Types.Mixed, default: {
        is_ban: false // User cannot enter to the system.
        , is_mute: false // The user cannot write in a room
    }},
    create_at: {type: Schema.Types.Date, default: Date.now},

    connected_at: {type: Schema.Types.Date, default: null},
    disconnect_at: {type: Schema.Types.Date, default: null},

    // Logs
    logs: [{type: Schema.Types.Mixed}],

    // rooms reference
    rooms: [{type: Schema.Types.ObjectId, ref: 'user_has_room'}]
});

// Methods
UserSchema.methods.toggle = function(property){
    this.forbidden[property] = !this.forbidden[property];
    this.markModified('forbidden');
    return this;
};

// Virtual Properties
UserSchema.virtual('is_banned').get(function(){
    return this.forbidden.is_ban;
});

UserSchema.virtual('is_muted').get(function(){
    return this.forbidden.is_mute;
});

/**
 * Before save a user document, Make sure:
 * 1. User's picture is assigned, if not, assign it to default one.
 */
UserSchema.pre('save', function (next) {
    var user = this;

    // ensure user picture is set
    if (!user.picture) {
        user.picture = config.default_user_picture;
    }

    next();
});

var userModel = Mongoose.model('user', UserSchema);

module.exports = userModel;