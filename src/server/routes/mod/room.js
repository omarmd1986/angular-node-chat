'use strict'

var express = require('express');
var router = express.Router();

var RoomModel = require('../../models/room');
var UserRoomModel = require('../../models/user_has_room');
var guards = require('../../guards');

/**
 * Get all the room’s messages from the :room, even the unapproved
 */
router.get('/messages', function (req, res) {
    let limit = req.query.limit || 50,
        offset = req.query.offset || 0;

    UserRoomModel
        .messages(req.room.id, {
            limit: limit,
            offset: offset,
            status: ['send', 'fail', 'required_approval']
        }, function (err, messages) {
            if (err) { return res.status(400).json({ message: 'Imposible to fetch the messages.' }) }
            res.json(messages);
        });

});

/**
 * Get all the room’s messages unapproved from :room
 */
router.get('/messages/unapprove', function (req, res) {
    let limit = req.query.limit || 50,
        offset = req.query.offset || 0;

    UserRoomModel
        .messages(req.room.id, {
            limit: limit,
            offset: offset,
            status: ['required_approval']
        }, function (err, messages) {
            if (err) { return res.status(400).json({ message: 'Imposible to fetch the unapprove messages.' }) }
            res.json(messages);
        });

});

/**
 * Toggle the mute status in the room
 */
router.put('/toggle/mute', function (req, res) {
    UserRoomModel
        .toggleForbidden(req.room.id, req.user.id, 'is_mute', function (err, usermodel) {
            if (err) { return res.status(400).json({ message: 'Imposible to change the mute status.' }) }
            res.json(usermodel.forbidden.is_mute);
        });
});

/**
 * Toggle the ban status in the room
 */
router.put('/toggle/banned', function (req, res) {
    UserRoomModel
        .toggleForbidden(req.room.id, req.user.id, 'is_ban', function (err, usermodel) {
            if (err) { return res.status(400).json({ message: 'Imposible to change the banned status.' }) }
            res.json(usermodel.forbidden.is_ban);
        });
});

router.put('/approve/message', function (req, res) {
    let messageId = req.body.message;
    UserRoomModel.updateMessage(messageId, {
        status: 'send'
    }, function (err, message) {
        if (err) { return res.status(400).json({ message: 'Imposible to change the message\'s status' }) }
        res.json(message);
    });
});

module.exports = router;