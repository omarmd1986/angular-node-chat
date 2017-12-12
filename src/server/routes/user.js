'use strict'

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var UserHasRoom = require('../models/user_has_room');
var guards = require('../guards');

router.get('/me', function (req, res) {
    return res.json(req.user);
});

router.get('/me/rooms', function (req, res) {
    UserHasRoom
        .myPublicRooms(req.user.id, function (err, rooms) {
            if (err) {
                return res.status(400).json({ message: 'Unable to find the user\'s rooms' });
            }
            return res.json(rooms)
        });
});

router.post('/room/:room', guards.requiredRoom, function (req, res) {
    UserHasRoom.findOrCreate({
        user_id: req.user.id,
        room_id: req.room.id
    }, function(err, userhasroom){
        if(err){
            return res.status(400).json({message: 'Unable to create or find a room'});
        }
        res.json(userhasroom);
    });
});

module.exports = router;