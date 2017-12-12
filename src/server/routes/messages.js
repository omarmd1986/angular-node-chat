'use strict'

var express = require('express');
var router = express.Router();

var pusher = require('../pusher');

var MessageModel = require('../models/message');

router.post('/send/:room', function (req, res) {
    if(!req.room){
        return res.status(404).json({ message: 'Unable to find the room' });
    }
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

module.exports = router;