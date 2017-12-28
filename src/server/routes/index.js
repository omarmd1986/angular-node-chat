'use strict'

// Routes
var auth = require('./auth');
var pusherRoute = require('./pusher');
var api = require('./api');

var userRoute = require('./user');
var adminUserRoute = require('./admin/user');

var roomRoute = require('./room');
var adminRoomRoute = require('./admin/room');

var guards = require('../guards');
var Passport = require('../auth');

var init = function (app) {

	// Passport authentication
	app.use('/', auth);

	// Pusher Authentication
	app.use('/', pusherRoute);

	// The user must be active
	app.use('/api', Passport.authenticate('jwt'), guards.isBanned, api);

	// The User endpoints.
	app.use('/api/admin/user', Passport.authenticate('jwt'), guards.isBanned, guards.admin, adminUserRoute);
	app.use('/api/user', Passport.authenticate('jwt'), guards.isBanned, userRoute);

	// Room endpoints
	app.use('/api/admin/room', Passport.authenticate('jwt'), guards.isBanned, guards.admin, adminRoomRoute);
	app.use('/api/room', Passport.authenticate('jwt'), guards.isBanned, roomRoute);

	// Chat endpoints
	// app.use('/api/chat', Passport.authenticate('jwt'), guards.isBanned, chatRoute);
};

module.exports = init;
