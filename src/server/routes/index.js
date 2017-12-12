'use strict'

// Routes
var auth = require('./auth');
var api = require('./api');

var userRoute = require('./user');
var adminUserRoute = require('./admin/user');

var messageRoute = require('./messages');

var roomRoute = require('./room');
var adminRoomRoute = require('./admin/room');

var guards = require('../guards');
var Passport = require('../auth');

var init = function (app) {

	// Passport authentication
	app.use('/', auth);

	// The user must be active
	app.use('/api', Passport.authenticate('jwt'), guards.banned, api);

	// The User endpoints.
	app.use('/api/admin/user', Passport.authenticate('jwt'), guards.banned, guards.admin, adminUserRoute);
	app.use('/api/user', Passport.authenticate('jwt'), guards.banned, userRoute);

	// Message endpoint
	app.use('/api/message', Passport.authenticate('jwt'), guards.banned, guards.room, messageRoute);

	// Room endpoints
	app.use('/api/admin/room', Passport.authenticate('jwt'), guards.banned, guards.admin, guards.room, adminRoomRoute);
	app.use('/api/room', Passport.authenticate('jwt'), guards.banned, guards.room, roomRoute);

};

module.exports = init;
