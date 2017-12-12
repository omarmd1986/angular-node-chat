'use strict'

var express = require('express');
var router = express.Router();

var RoomModel = require('../../models/room');

router.post('/', function (req, res) {
    RoomModel.create(req.body, function (err, room) {
        if (err) {
            return res.status(400).json({ message: 'Imposible to create a room' });
        }
        res.json(room);
    });
});

router.put('/:id/toggle/active', function (req, res) {
    RoomModel.toggle(req.params.id, 'is_active', function (err, room) {
        if(err){
            return res.status(400).json({ message: 'Imposible to change the `active` status' });
        }
        return res.json({ is_actived: room.is_activated });
    });
});

router.put('/:id/toggle/aproval', function (req, res) {
    RoomModel.toggle(req.params.id, 'message_require_aproval', function (err, room) {
        if(err){
            return res.status(400).json({ message: 'Imposible to change the `message require aproval` status' });
        }
        return res.json({ is_message_require_aproval: room.is_message_require_aproval });
    });
});

module.exports = router;