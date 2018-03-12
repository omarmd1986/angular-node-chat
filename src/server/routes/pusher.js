'use strict'

var express = require('express');
var passport = require('../auth');

let UserRoom = require('../models/user_has_room');
let User = require('../models/user');
let Chat = require('../models/chat');

var pusher = require('../pusher').pusher;
var guards = require('../guards');

var router = express.Router();

let createAuthHeader = function (req, res, next) {
	req.headers['authorization'] = req.params.token;
	next();
};

let createRoomParams = function (req, res, next) {
	req.params['room'] = req.query.channel_name.split('-')[1];
	next();
};

// 4. Pusher auth for `Private channels`. The passport authenticate functions guard check the request
// @see https://pusher.com/docs/authenticating_users#jsonp_auth_endpoints
router.get("/auth/pusher/room/:token"
	, createAuthHeader //Take the token from the URL and pass it to the Authorization header
	, passport.authenticate('jwt') // Validate the token
	, createRoomParams // Passing the room ID to the params object
	, guards.requiredRoom // Extract the room from the query
	, guards.isBanned // Check if the user has access to this chat room
	, function (req, res) {
		var query = req.query;

		var socketId = query.socket_id;
		var channel = query.channel_name;
		var callback = query.callback;

		UserRoom.findOrCreate({
			room_id: req.room._id
			, user_id: req.user._id
		}, function (err, user_room) {
			if (err) {
				return res.status(400).send();
			}
			let info = req.user.toObject();
			info['is_mod'] = user_room.is_mod;
			var presenceData = {
				user_id: req.user._id,
				user_info: info
			};

			var auth = JSON.stringify(pusher.authenticate(socketId, channel, presenceData));
			var cb = callback.replace(/\"/g, "") + "(" + auth + ");";

			res.set({ "Content-Type": "application/javascript" });

			res.send(cb);
		});

	});


// 4. Pusher auth for `Private channels`. The passport authenticate functions guard check the request
// @see https://pusher.com/docs/authenticating_users#jsonp_auth_endpoints
router.get("/auth/pusher/chat/:token"
	, createAuthHeader //Take the token from the URL and pass it to the Authorization header
	, passport.authenticate('jwt') // Validate the token
	//something else
	, guards.isBanned // Check if the user has access to this chat room
	, function (req, res) {
		var query = req.query;

		var socketId = query.socket_id;
		var channel = query.channel_name;
		var callback = query.callback;

		Chat.findOrCreate({
			from_id: req.room._id
			, user_id: req.user._id
		}, function (err, user_room) {
			if (err) {
				return res.status(400).send();
			}
			let info = req.user.toObject();
			info['is_mod'] = user_room.is_mod;
			var presenceData = {
				user_id: req.user._id,
				user_info: info
			};

			var auth = JSON.stringify(pusher.authenticate(socketId, channel, presenceData));
			var cb = callback.replace(/\"/g, "") + "(" + auth + ");";

			res.set({ "Content-Type": "application/javascript" });

			res.send(cb);
		});

	});

// 4. Pusher auth for `Private channels`. The passport authenticate functions guard check the request
// @see https://pusher.com/docs/authenticating_users#jsonp_auth_endpoints
router.get("/auth/pusher/system/:token"
	, createAuthHeader //Take the token from the URL and pass it to the Authorization header
	, passport.authenticate('jwt') // Validate the token
	//something else
	, guards.isBanned // Check if the user has access to this chat room
	, function (req, res) {
		var query = req.query;

		var socketId = query.socket_id;
		var channel = query.channel_name;
		var callback = query.callback;

		var presenceData = {
			user_id: req.user._id,
			user_info: req.user
		};

		User.connect(req.user.id, function (err, user) { });

		var auth = JSON.stringify(pusher.authenticate(socketId, channel, presenceData));
		var cb = callback.replace(/\"/g, "") + "(" + auth + ");";

		res.set({ "Content-Type": "application/javascript" });

		res.send(cb);
	});

/**
 * Redirect depending what channel is
 */
router.get("/auth/pusher/:token", function (req, res) {
	let token = req.params.token;

	var query = req.query;

	var socketId = query.socket_id;
	var channel = query.channel_name;
	var callback = query.callback;

	let type = req.query.channel_name.split('-')[2];

	switch (type) {
		case 'chat':
			res.redirect(`/auth/pusher/chat/${token}?socket_id=${socketId}&channel_name=${channel}&callback=${callback}`)
			break;
		case 'system':
			res.redirect(`/auth/pusher/system/${token}?socket_id=${socketId}&channel_name=${channel}&callback=${callback}`)
			break;
		case 'room':
			res.redirect(`/auth/pusher/room/${token}?socket_id=${socketId}&channel_name=${channel}&callback=${callback}`);
			break;
		default:
			res.status(400).send();
			break;
	}
});

module.exports = router;
