'use strict'

var express = require('express');
var router = express.Router();

var moment = require('moment');

var User = require('../models/user');
var UserHasRoom = require('../models/user_has_room');
var guards = require('../guards');
var pusher = require('../pusher');

/**
 * Return the login user information
 */
router.get('/me', function (req, res) {
    return res.json(req.user);
});

/**
 * Return all the rooms the user its register
 */
router.get('/me/rooms', function (req, res) {
    UserHasRoom
        .myPublicRooms(req.user.id, function (err, rooms) {
            if (err) {
                return res.status(400).json({ message: 'Unable to find the user\'s rooms' });
            }
            return res.json(rooms)
        });
});

/**
 * Add a room to the user
 */
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

/**
 * Send the message to the room
 */
router.post('/sent/message/:room', guards.requiredRoom, function(req, res){

    // save the message
    UserHasRoom.addMessage(req.user.id, req.params.room, { text: req.body.text }, function(err, message){
        if (err) {
            return res.status(400).json({ message: 'Unable to save the message' });
        }

        pusher.sendMessage(req.params.room, {
            text: req.body.text,
            user: req.user,
            room: req.room,
            date: moment(message.created_at).utc().format()
        }, function (err, something) {
            if (err) {
                UserHasRoom.updateMessage(message.id, {status: 'fail'});
                return res.status(400).json({ message: 'Unable to send the message' });
            }
            return res.json(message);
        });
    });
});

router.put('/connect', function (req, res) {
    User.updateStatus(req.user.id, 'connected_at', function (err, userroom) {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: 'Unable to change the status.' });
        }
        return res.json(true);
    });
});

router.put('/disconnect', function (req, res) {
    User.updateStatus(req.user.id, 'disconnected_at', function (err, userroom) {
        if (err) {
            return res.status(400).json({ message: 'Unable to change the status.' });
        }
        return res.json(true);
    });
});

module.exports = router;