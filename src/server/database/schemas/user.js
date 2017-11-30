'use strict';

var Mongoose = require('mongoose');
var config = require('../../config');

/**
 * Every user has a username, socialId, and a picture.
 */
var UserSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    socialId: { type: String, default: null },
    provider: { type: String, default: null },
    picture: { type: String, default: config.default_user_picture }
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

// Create a user model
var userModel = Mongoose.model('user', UserSchema);

module.exports = userModel;