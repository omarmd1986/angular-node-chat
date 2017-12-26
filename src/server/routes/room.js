'use strict'

var express = require('express');
var router = express.Router();

var RoomModel = require('../models/room');
var UserRoomModel = require('../models/user_has_room');
var guards = require('../guards');

router.get('/:room?', guards.room, guards.isBanned, function (req, res) {
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

router.get('/:room/messages', guards.requiredRoom, guards.isBanned, function (req, res) {
    let offset = req.query.offset,
        limit = req.query.limit;
    UserRoomModel.messages(req.room.id, {offset: offset, limit: limit}, function (err, messages) {
        if (err) {
            return res.status(400).json({ message: 'Imposible to fetch the room\'s messages.' });
        }
        res.json(messages);
    });
});

router.get('/:room/users', guards.requiredRoom, guards.isBanned, function (req, res) {
    UserRoomModel.users(req.room.id, function (err, users) {
        if (err) {
            return res.status(400).json({ message: 'Imposible to fetch the room\'s users.' });
        }
        res.json(users);
    });
});

router.post('/private/:user', guards.isBanned, function (req, res) {
    UserRoomModel.privateMessage(req.user.id, req.params.user, function (err, room) {
        if (err) {
            return res.status(400).json({ message: 'Imposible create a private room.' });
        }
        res.json(room);
    });
});

module.exports = router;