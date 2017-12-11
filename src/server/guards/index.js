'use strict'

let userModel = require('../database').models.user;

module.exports = {
    banned: function (req, res, next) {
        if (!req.user) {
            return res.status(404).json({message: "User not found."});
        }
        let user = new userModel(req.user);

        // Virtual property
        if (user.is_banned) {
            return res.status(403).json({message: "User was banned in the server."});
        }

        next();
    }
}