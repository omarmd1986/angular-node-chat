'use strict'

var User        = require('../models/user');
var UserModel   = require('../database').models.user;

var init = function (router) {

    router.put('/user/:id/toggle/banned', function (req, res) {
        let id = req.params.id;
        User.toggle(id, 'is_ban', function (err, user) {
            if (err) {
                return res.status(400).json({ message: 'Unable to change the ban status.' });
            }
            return res.json({ is_banned: user.is_banned });
        });
    });

    router.put('/user/:id/toggle/muted', function (req, res) {
        let id = req.params.id;
        User.toggle(id, 'is_mute', function (err, user) {
            if (err) {
                return res.status(400).json({ message: 'Unable to change the mute status.' });
            }
            return res.json({ is_muted: user.is_muted });
        });
    });

};

module.exports = init;