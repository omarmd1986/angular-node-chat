'use strict'

var express = require('express');
var router = express.Router();

var RoomModel = require('../models/room');
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

module.exports = router;