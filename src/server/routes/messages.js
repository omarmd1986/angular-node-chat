'use strict'

var express = require('express');
var router = express.Router();

var pusher = require('../pusher');
var guards = require('../guards');

var MessageModel = require('../models/message');

router.post('/:room', guards.requiredRoom, function (req, res) {

    pusher.sendMessage(req.params.room, req.body.text, function (err, something) {
        if (err) {
            return res.status(400).json({ message: 'Unable to send the message' });
        }
        // save the message
        MessageModel.create(req.user.id, req.params.room, { text: req.body.text }, function (err, message) {
            if (err) {
                return res.status(400).json({ message: 'Unable to save the message' });
            }
            return res.json(message);
        });
    });

});

router.get('/:room', guards.requiredRoom, function (req, res) {
    let limit = req.query.limit
        , offset = req.query.offset;

    MessageModel.fetch(req.user.id, req.room.id, limit, offset, function (err, messages) {
        if (err) {
            return res.status(400).json({ message: 'Unable to fetch messages' });
        }
        res.json(messages);
    });

});

module.exports = router;