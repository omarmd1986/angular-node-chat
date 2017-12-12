'use strict'

var express = require('express');
var router = express.Router();

var RoomModel = require('../../models/room');
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
        RoomModel.allRooms(fn);
    }
});

router.post('/', function (req, res) {
    RoomModel.create(req.body, function (err, room) {
        if (err) {
            return res.status(400).json({ message: 'Imposible to create a room' });
        }
        res.json(room);
    });
});

router.put('/:room/toggle/active', guards.requiredRoom, function (req, res) {
    RoomModel.toggle(req.params.room, 'is_active', function (err, room) {
        if(err){
            return res.status(400).json({ message: 'Imposible to change the `active` status' });
        }
        return res.json({ is_actived: room.is_activated });
    });
});

router.put('/:room/toggle/aproval', guards.requiredRoom, function (req, res) {
    RoomModel.toggle(req.params.room, 'message_require_aproval', function (err, room) {
        if(err){
            return res.status(400).json({ message: 'Imposible to change the `message require aproval` status' });
        }
        return res.json({ is_message_require_aproval: room.is_message_require_aproval });
    });
});

module.exports = router;