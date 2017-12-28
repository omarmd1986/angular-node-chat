'use strict'

var express = require('express');
var router = express.Router();

var RoomModel = require('../models/room');
var UserRoomModel = require('../models/user_has_room');
var guards = require('../guards');

router.post('/private/:user', guards.isBanned, function (req, res) {
    UserRoomModel.privateMessage(req.user, req.params.user, function (err, room) {
        if (err) {
            return res.status(400).json({ message: 'Imposible create a private room.' });
        }
        res.json(room);
    });
});

module.exports = router;