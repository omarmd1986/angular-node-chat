'use strict'

var express = require('express');
var router = express.Router();

var RoomModel = require('../models/room');
var UserRoomModel = require('../models/user_has_room');
var guards = require('../guards');

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
        RoomModel.allPublicRooms(fn);
    }
});

router.put('/:room/connect', guards.requiredRoom, function (req, res) {
    UserRoomModel.updateStatus(req.user.id, req.room.id, 'connected_at', function (err, userroom) {
        if (err) {
            return res.status(400).json({ message: 'Unable to change the status.' });
        }
        return res.json(userroom);
    });
});

router.put('/:room/disconnect', guards.requiredRoom, function (req, res) {
    UserRoomModel.updateStatus(req.user.id, req.room.id, 'disconnected_at', function (err, userroom) {
        if (err) {
            return res.status(400).json({ message: 'Unable to change the status.' });
        }
        return res.json(userroom);
    });
});

module.exports = router;