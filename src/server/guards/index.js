'use strict'

let roomModel = require('../models/room');
let userRoomModel = require('../models/user_has_room');

let roomFn = function (required, req, res, next) {
    let id = req.params.room || req.body.room || req.query.room;
    if (!id) {
        return required
            ? res.status(404).json({ message: "Room not found." })
            : next();
    }
    roomModel.findById(id, function (err, room) {
        if (err || !room) {
            return res.status(404).json({ message: "Room not found." });
        }
        req.room = room;
        if (req.user.is_admin) {
            // admin can access no matter what
            return next();
        }
        if (!room.is_activated) {
            return res.status(423).json({ message: "Room is not active." });
        }
        let _allowIds = room.settings.is_private;
        if (room.is_private && _allowIds.indexOf(req.user.id) === -1) {
            return res.status(403).json({ message: "Private room." });
        }
        return next();
    });
};

module.exports = {
    isBanned: function (req, res, next) {
        if (!req.user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Virtual property
        if (req.user.is_banned) {
            return res.status(401).json({ message: "User was banned in the server." });
        }

        if (!req.room) { return next(); }

        userRoomModel
            .findOrCreate({
                user_id: req.user.id,
                room_id: req.room.id
            }, function (err, user_room) {
                if (err) {
                    return res.status(404).json({ message: "Chat room not found." });
                }
                if (user_room.is_banned) {
                    return res.status(406).json({ message: "User was banned in this room." });
                }
                return next();
            });
    },

    // Muted in all chat
    isMuted: function (req, res, next) {
        if (req.user.is_muted) {
            return res.status(412).json({ message: "User was muted in the server." });
        }
        if (!req.room) { return next(); }

        userRoomModel
            .findOrCreate({
                user_id: req.user.id,
                room_id: req.room.id
            }, function (err, user_room) {
                if (err) {
                    return res.status(404).json({ message: "Chat room not found." });
                }
                if (user_room.is_muted) {
                    return res.status(412).json({ message: "User was muted in this room." });
                }
                return next();
            });

    },

    requiredRoom: function (req, res, next) {
        roomFn(true, req, res, next);
    },

    room: function (req, res, next) {
        roomFn(false, req, res, next);
    },

    admin: function (req, res, next) {
        if (req.user.is_admin) {
            // admin can access no matter what
            return next();
        }
        return res.status(403).json({ message: "You cannot hava access to this resource." });
    },

    mod: function (req, res, next) {
        if (req.user.is_admin) {
            // admin can access no matter what
            return next();
        }
        userRoomModel
            .findOrCreate({}, function (err, usermodel) {
                if (err) { return res.status(400).json({ message: "Something went wrong." }); }
                if (!usermodel.is_mod) {
                    return res.status(403).json({ message: "You cannot hava access to this resource." });
                }
                next();
            });
    }

}