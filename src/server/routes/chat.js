'use strict'

var express = require('express');
var router = express.Router();
var moment = require('moment');

var Filter = require('bad-words'),
    filter = new Filter();

// var UserRoomModel = require('../models/user_has_room');
var ChatModel = require('../models/chat');
var guards = require('../guards');
var pusher = require('../pusher');

/**
 * Return the chat messages
 */
router.get('/:chat/messages', guards.chat, function (req, res) {
    ChatModel.messages(req.params.chat, {
        limit: req.query.limit || 50,
        offsete: req.query.offset || 0
    }, function (err, messages) {
        if (err) { return res.status(400).json({ message: 'Was imposible to fetch the messages.' }) }
        res.json(messages);
    });
});

/**
 * Send the message to the chat
 * @param chat The chat ID
 * @param text The text to be sent
 */
router.post('/messages', guards.chat, function (req, res) {

    ChatModel.addMessage(req.user.id, req.room.id, { text: filter.clean(req.body.text) }, function (err, message) {
        if (err) { return res.status(400).json({ message: 'Unable to save the message' }); }

        pusher.sendChatMessage(req.chat, {
            text: filter.clean(req.body.text),
            user: req.user,
            date: moment(message.created_at).utc().format()
        }, function (err, something) {
            if (err) {
                ChatModel.updateMessage(message.id, { status: 'fail' });
                return res.status(400).json({ message: 'Unable to send the message' });
            }
            return res.json(message);
        });
    });
});

/**
 * Toggle the receive or not updates from this chat to the login user.
 */
router.put('/:chat/toggle/silence', guards.chat, function (req, res) {
    let chat = req.chat;

    chat.toggleUpdates();

    chat.save(function (err, saveChat) {
        if (err) { return res.status(400).json({ message: 'Imposible to silence the chat.' }) }
        res.json(chat);
    });
});

module.exports = router;