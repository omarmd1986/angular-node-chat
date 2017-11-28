'use strict';

var Mongoose 	= require('mongoose');

var config 		= require('../config');

Mongoose.connect(config.dbUri, {
	useMongoClient: true
	/* other options */
});

// Throw an error if the connection fails
Mongoose.connection.on('error', function(err) {
	if(err) throw err;
});

// mpromise (mongoose's default promise library) is deprecated, 
// Plug-in your own promise library instead.
// Use native promises
Mongoose.Promise = global.Promise;

module.exports = { Mongoose, 
	models: {
		user: require('./schemas/user.js'),
		room: require('./schemas/room.js')
	}
};