'use strict'

var express = require('express');
var router = express.Router();

var User = require('../../models/user');
var UserHasRoom = require('../../models/user_has_room');

router.get('/:id?', function (req, res) {
    let id = req.params.id;
    let fn = function (err, user) {
        if (err) {
            return res.status(400).json({ message: 'Imposible to fetch the users' });
        }
        return res.json(user);
    };
    if (id) {
        User.findById(id, fn);
    } else {
        let offset = req.query.offset
            , limit = req.query.limit;
        User.findAll(offset, limit, fn);
    }
});

router.put('/:id/toggle/banned', function (req, res) {
    let id = req.params.id;
    User.toggle(id, 'is_ban', function (err, user) {
        if (err) {
            return res.status(400).json({ message: 'Unable to change the ban status.' });
        }
        return res.json(user.is_banned);
    });
});

router.put('/:id/toggle/muted', function (req, res) {
    let id = req.params.id;
    User.toggle(id, 'is_mute', function (err, user) {
        if (err) {
            return res.status(400).json({ message: 'Unable to change the mute status.' });
        }
        return res.json(user.is_muted);
    });
});

router.get('/:id/rooms', function (req, res) {
    UserHasRoom
        .myPublicRooms(req.params.id, function (err, rooms) {
            if (err) {
                return res.status(400).json({ message: 'Unable to find the user\'s rooms' });
            }
            return res.json(rooms)
        });
});

module.exports = router;