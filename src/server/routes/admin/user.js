'use strict'

var express = require('express');
var router = express.Router();

var User = require('../../models/user');
var pusher = require('../../pusher');
var UserHasRoom = require('../../models/user_has_room');

/**
 * Return the user information based on :id or all the users
 * @param limit
 * @param offset
 */
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
        let offset = req.query.offset || 0
            , limit = req.query.limit || 50;
        User.findAll(offset, limit, fn);
    }
});

/**
 * Toggle the banned property of the user based from :id.
 * The system should sent a WS signal to logging out the user immediately
 */
router.put('/:id/toggle/banned', function (req, res) {
    let id = req.params.id;
    User.toggle(id, 'is_ban', function (err, user) {
        if (err) {
            return res.status(400).json({ message: 'Unable to change the ban status.' });
        }
        // If was banned, send a WS signal to close the session
        if (user.forbidden && user.forbidden.is_ban) { pusher.banned(id) }

        return res.json(user.is_banned);
    });
});

/**
 * Toggle the muted property of the user based from :id
 */
router.put('/:id/toggle/muted', function (req, res) {
    let id = req.params.id;
    User.toggle(id, 'is_mute', function (err, user) {
        if (err) {
            return res.status(400).json({ message: 'Unable to change the mute status.' });
        }
        return res.json(user.is_muted);
    });
});

/**
 * Return all the user's rooms.
 * @param limit
 * @param offset
 */
router.get('/:id/rooms', function (req, res) {
    UserHasRoom
        .myPublicRooms(req.params.id, {
            limit: req.query.limit || 50,
            offset: req.query.offset || 0
        }, function (err, rooms) {
            if (err) {
                return res.status(400).json({ message: 'Unable to find the user\'s rooms' });
            }
            return res.json(rooms)
        });
});

/**
 * Return all the user's chats.
 * @param limit
 * @param offset
 */
router.get('/:id/chats', function (req, res) {
    UserHasRoom
        .myChats(req.params.id, {
            limit: req.query.limit || 50,
            offset: data.offset || 0
        }, function (err, chats) {
            if (err) {
                return res.status(400).json({ message: 'Unable to find the user\'s chats' });
            }
            return res.json(chats)
        });
});

module.exports = router;