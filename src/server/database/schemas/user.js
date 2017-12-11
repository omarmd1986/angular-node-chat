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
    forbidden: {type: Schema.Types.Mixed, default: {is_ban: false, is_mute: false}},
    create_at: {type: Schema.Types.Date, default: Date.now},

    //logs reference
    logs: [{type: Schema.Types.ObjectId, ref: 'user_log'}],

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

//Users Log

let userLogSchema = new Schema({
    action: {type: Schema.Types.String, required: true},
    date: {type: Schema.Types.Date, default: Date.now},

    // User reference
    user: { type: Schema.Types.ObjectId, ref: 'user' },
});

let userLogModel = Mongoose.model('user_log', userLogSchema);
var userModel = Mongoose.model('user', UserSchema);

module.exports = userLogModel;
module.exports = userModel;