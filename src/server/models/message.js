'use strict';

var MessageModel = require('../database').models.message;
var UserRoom = require('./user_has_room');

var create = function (user, room, messageData, callback) {
	UserRoom.findOrCreate({ user: user, room: room }, function (err, user_room) {
		if (err) {
			return callback(err, null);
		}
		messageData.UserRoom = user_room;
		let message = new MessageModel(messageData);
		message.save(callback);
	});
};

var fetch = function (user, room, limit, offset, callback) {
	limit = limit | 50;
	offset = offset | 0;

	MessageModel
		.find({})
		.where('user').equals(user)
		.where('room').equals(room)
		.skip(offset)
		.limit(limit)
		.exec(callback);
};

module.exports = { create, fetch };
