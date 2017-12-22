'use strict'

var express = require('express');
var config = require('../config');
var passport = require('../auth');
var sprintf = require('sprintf-js').sprintf;

let User = require('../models/user');
let UserRoom = require('../models/user_has_room');

var pusher = require('../pusher').pusher;
var guards = require('../guards');

var router = express.Router();

let opts = {
	assignProperty: config.jwtPtrHolder,
	failureRedirect: '/login',
	failureFlash: true
};

let redirectFn = function (req, res) {
	if (!req[config.jwtPtrHolder]) {
		return res.redirect('/login');
	}
	let url = sprintf(config.tokenAcceptCallback, req[config.jwtPtrHolder]);
	return res.redirect(url);
};

let catchFn = function (req, res, next) {

};

// Social Authentication routes
// 1. Login via Facebook
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', opts), redirectFn);

// 2. Login via Twitter
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', opts), redirectFn);

// 3. Login via Google
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get('/auth/google/callback', passport.authenticate('google', opts), redirectFn);


let createAuthHeader = function (req, res, next) {
	req.headers['authorization'] = req.params.token;
	let room = req.query.channel_name.split('-')[1];
	req.params['room'] = room;
	next();
};

// 4. Pusher auth for `Private channels`. The passport authenticate functions guard check the request
// @see https://pusher.com/docs/authenticating_users#jsonp_auth_endpoints
router.get("/auth/pusher/:token"
	, createAuthHeader //Take the token from the URL and pass it to the Authorization header
	, passport.authenticate('jwt') // Validate the token
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
			if(err){
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

module.exports = router;
