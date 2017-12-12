'use strict';

var MessageModel = require('../database').models.message;
var UserRoom = require('./user_has_room');

var create = function (user, room, messageData, callback){
	UserRoom.findOrCreate({user: user, room: room}, function(err, user_room){
		if(err){
			return callback(err, null);
		}
		messageData.UserRoom = user_room;
		let message = new MessageModel(messageData);
		message.save(callback);
	});

};

module.exports = { create };
