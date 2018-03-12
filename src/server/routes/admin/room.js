'use strict'

var express = require('express');
var router = express.Router();

var RoomModel = require('../../models/room');
var UserRoomModel = require('../../models/user_has_room');
var guards = require('../../guards');

router.get('/:room?', guards.room, function (req, res) {
    let id = req.params.room;
    let fn = function (err, rooms) {
        if (err) {
            return res.status(400).json({ message: 'Imposible to fetch the rooms' });
        }
        res.json(rooms);
    };
    if (id) {
        fn(null, req.room);
    } else {
        RoomModel.allRooms({
            limit: req.query.limit || 50,
            offset: req.query.offset || 0
        }, fn);
    }
});

/**
 * Create a new room.
 */
router.post('/', function (req, res) {
    RoomModel.create(req.body, function (err, room) {
        if (err) {
            return res.status(400).json({ message: 'Imposible to create a room' });
        }
        res.json(room);
    });
});

/**
 * Toggle the active status of the room
 */
router.put('/:room/toggle/active', guards.requiredRoom, function (req, res) {
    RoomModel.toggle(req.params.room, 'is_active', function (err, room) {
        if (err) {
            return res.status(400).json({ message: 'Imposible to change the `active` status' });
        }
        return res.json(room.is_activated);
    });
});

/**
 * Toggle the require approval status of the room
 */
router.put('/:room/toggle/approval', guards.requiredRoom, function (req, res) {
    RoomModel.toggle(req.params.room, 'message_require_approval', function (err, room) {
        if (err) {
            return res.status(400).json({ message: 'Imposible to change the `message require approval` status' });
        }
        return res.json(room.is_message_require_approval);
    });
});

/**
 * Return all the users in the :room
 */
router.get('/:room/users', guards.requiredRoom, function (req, res) {
    UserRoomModel.users(req.room.id, {
        limit: req.query.limit || 50,
        offset: req.query.offset || 0
    }, function (err, users) {
        if (err) {
            return res.status(400).json({ message: 'Imposible to fetch the room\'s users.' });
        }
        res.json(users);
    });
});


/**
 * Add the user id as moderator of one room
 * @param room The room id
 * @param id The user id will become in moderator
 */
router.post('/moderator', guards.requiredRoom, function (req, res) {
    UserRoomModel.changeModerator(req.room.id, req.body.id, true, function (err, userroom) {
        if (err) {
            return res.status(400).json({ message: 'Something went wrong.' })
        }
        return res.json(true);
    });
});

/**
 * Remove the user id as moderator of one room
 * @param room The room id
 * @param id The user id will become in moderator
 */
router.delete('/moderator', guards.requiredRoom, function (req, res) {
    UserRoomModel.changeModerator(req.room.id, req.body.id, false, function (err, userroom) {
        if (err) {
            return res.status(400).json({ message: 'Something went wrong.' })
        }
        return res.json(true);
    });
});

/**
 * Return all the moderators in the room :room
 */
router.get('/:room/moderator', guards.requiredRoom, function (req, res) {
    UserRoomModel
        .roomModerators(req.room.id, {
            limit: req.query.limit || 50,
            offset: req.query.offset || 0
        }, function (err, moderators) {

        });
});

module.exports = router;