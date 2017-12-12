'use strict'

let userModel = require('../database').models.user;
let roomModel = require('../database').models.room;

module.exports = {
    banned: function (req, res, next) {
        if (!req.user) {
            return res.status(404).json({ message: "User not found." });
        }
        let user = new userModel(req.user);

        // Virtual property
        if (user.is_banned) {
            return res.status(423).json({ message: "User was banned in the server." });
        }

        next();
    },

    room: function (req, res, next) {
        let id = req.params.room;
        if(!id){
            return res.status(404).json({ message: "Room not found." });
        }
        roomModel.findById(id, function (err, room) {
            if (err || !room) {
                return res.status(404).json({ message: "Room not found." });
            }
            if(req.user.is_admin){
                // admin can access no matter what
                return next();
            }
            if (!room.is_activated) {
                return res.status(403).json({ message: "Room is not active." });
            }
            let _allowIds = room.settings.is_private;
            if (room.is_private && _allowIds.indexOf(req.user.id) === -1) {
                return res.status(403).json({ message: "Private room." });
            }
            next();
        });

    },

    admin: function(req, res, next){
        if(req.user.is_admin){
            // admin can access no matter what
            return next();
        }
        return res.status(403).json({ message: "You cannot hava access to this resource." });
    }

}