'use strict'

var express = require('express');
var router = express.Router();

var moment = require('moment');

var User = require('../models/user');
var UserHasRoom = require('../models/user_has_room');
var guards = require('../guards');
var pusher = require('../pusher');

/**
 * Return the loggin user information based on the token
 */
router.get('/me', function (req, res) {
    return res.json(req.user);
});

/**
 * Return all the rooms the user is register
 * @param limit Integer passed in form of query parameters.
 * @param offset Integer passed in form of query parameters.
 */
router.get('/me/rooms', function (req, res) {
    UserHasRoom
        .myPublicRooms(req.user.id, {
            limit: req.query.limit || 50,
            offset: req.query.offset || 0
        }, function (err, rooms) {
            if (err) {
                return res.status(400).json({ message: 'Unable to find the user\'s rooms' });
            }
            return res.json(rooms)
        });
});

/**
 * Return all the login user’s chat
 * @param limit Integer passed in form of query parameters.
 * @param offset Integer passed in form of query parameters.
 */
router.get('/me/chats', function (req, res) {
    UserHasRoom
        .myChats(req.user.id, {
            limit: req.query.limit || 50,
            offset: req.query.offset || 0
        }, function (err, chats) {
            if (err) {
                return res.status(400).json({ message: 'Unable to find the user\'s chats' });
            }
            return res.json(chats)
        });
});

/**
 * Add the room to the user.
 * @param room ID
 */
router.post('/room', guards.requiredRoom, guards.isBanned, function (req, res) {
    UserHasRoom.findOrCreate({
        user_id: req.user.id,
        room_id: req.room.id
    }, function (err, userhasroom) {
        if (err) {
            return res.status(400).json({ message: 'Unable to create or find a room' });
        }
        res.json(userhasroom);
    });
});

/**
 * Mark the user as connected
 */
router.put('/connect', function (req, res) {
    User.connect(req.user.id, function (err, userroom) {
        if (err) {
            return res.status(400).json({ message: 'Unable to change the status.' });
        }
        return res.json(true);
    });
});

/**
 * Mark the user as disconnect
 */
router.put('/disconnect', function (req, res) {
    User.disconnect(req.user.id, function (err, userroom) {
        if (err) {
            return res.status(400).json({ message: 'Unable to change the status.' });
        }
        return res.json(true);
    });
});

module.exports = router;