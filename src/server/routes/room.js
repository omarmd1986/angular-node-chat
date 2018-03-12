'use strict'

var express = require('express');
var router = express.Router();

var Filter = require('bad-words');
var filter = new Filter();

var RoomModel = require('../models/room');
var UserRoomModel = require('../models/user_has_room');
var guards = require('../guards');

/**
 * Return the room public and active
 * Or all public and active rooms
 * @param limit
 * @param offset
 */
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
        RoomModel.allPublicRooms({
            limit: req.query.limit || 50,
            offset: data.query.offset || 0
        }, fn);
    }
});

/**
 * Return all the messages posted(approved)
 * @param limit
 * @param offset
 */
router.get('/:room/messages', guards.requiredRoom, guards.isBanned, function (req, res) {
    let offset = req.query.offset || 0,
        limit = req.query.limit || 50;
    UserRoomModel.messages(req.room.id, {
        offset: offset,
        limit: limit
    }, function (err, messages) {
        if (err) {
            return res.status(400).json({ message: 'Imposible to fetch the room\'s messages.' });
        }
        res.json(messages);
    });
});


/**
 * Send the message to the room
 * @param room The room ID
 * @param text The text to be sent
 */
router.post('/messages', guards.requiredRoom, guards.isBanned, guards.isMuted, function (req, res) {

    UserRoomModel.addMessage(req.user.id, req.room.id, {
        text: filter.clean(req.body.text),
        status: req.room.settings.message_require_approval ? 'required_approval' : 'send'
    }, function (err, message) {
        if (err) {
            return res.status(400).json({ message: 'Unable to save the message' });
        }

        if(req.room.settings.message_require_approval){
            return res.json(message);
        }
        
        pusher.sendMessage(req.room, {
            text: filter.clean(req.body.text),
            user: req.user,
            room: req.room,
            date: moment(message.created_at).utc().format()
        }, function (err, something) {
            if (err) {
                UserRoomModel.updateMessage(message.id, { status: 'fail' });
                return res.status(400).json({ message: 'Unable to send the message' });
            }
            return res.json(message);
        });
    });
});

/**
 * Toggle the receive or not updates from this room to the login user.
 */
router.put('/:room/toggle/silence', function(req, res){
    UserRoomModel
        .silence(req.user.id, req.params.room, function(err, usermodel){
            if (err) {
                return res.status(400).json({ message: 'Unable to silence the room' });
            }
            res.json(usermodel.settings.recive_updates);
        });
});

module.exports = router;