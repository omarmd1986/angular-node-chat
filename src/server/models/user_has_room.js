'use strict';

var moment = require('moment');

var UserRoomModel = require('../database').models.user_has_room;
var MessageModel = require('../database').models.message;

var create = function (data, callback) {
	var newUserRoom = new UserRoomModel(data);
	newUserRoom.save(callback);
};

var findOrCreate = function (data, callback) {
	UserRoomModel.findOne({
		user: data.user_id,
		room: data.room_id
	})
		.populate('room')
		.exec(function (err, user_room) {
			if (err) { return callback(err); }
			if (user_room) {
				return callback(err, user_room);
			} else {
				var userRoomData = {
					user: data.user_id,
					room: data.room_id
				};
				create(userRoomData, callback);
			}
		});
}

var myPublicRooms = function (id, callback) {
	UserRoomModel
		.where('user').equals(id)
		.populate('room', null, { 'settings.is_active': true, 'deleted_at': null })
		.exec(function (err, result) {
			if (err) {
				return callback(err, null);
			}
			// Filter by active..
			// Filter by is_private is false or the user has access to the room
			let actives = result.filter(r => (r.room !== null && (r.room.settings.is_private == false || r.room.settings.is_private.indexOf(id) !== -1)));
			// Taking only the room
			let rooms = actives.map((r, index) => actives[index] = r.room);
			callback(null, rooms);
		});
};

var messages = function (roomId, data, callback) {
	let offset = parseInt(data.offset || 0),
		limit = parseInt(data.limit || 50);
	UserRoomModel
		.where('room').equals(roomId)
		.populate('room', 'title description icon', { 'settings.is_active': true, 'deleted_at': null })
		.populate('user', 'username picture')
		.select('room user')
		.exec(function (err, result) {
			if (err) {
				return callback(err);
			}
			// Filter by active..
			// Filter by is_private is false or the user has access to the room
			let actives = result.filter(r => (r.room !== null));

			// Taking the IDS
			let ids = {};
			let room_ = null; // Saving the room
			actives.map((r, index) => { ids[r.id] = r.user; room_ = r.room; });

			MessageModel
				.where('userRoom').in(Object.getOwnPropertyNames(ids))
				.sort({ created_at: -1 })
				.skip(offset)
				.limit(limit)
				.lean() // Return simple javascript objects.
				.exec(function (err, messages) {
					if (err) {
						return callback(err);
					}
					//Filling importan properties
					messages.forEach(m => {
						m.user = ids[m.userRoom];
						m.room = room_;
						m.date = moment(m.created_at).utc().format();
					});
					messages.reverse();
					callback(err, messages);
				});
		});
};

var users = function (roomId, callback) {
	UserRoomModel
		.where('room').equals(roomId)
		.populate('room', 'icon', { 'settings.is_active': true, 'deleted_at': null })
		.populate('user')
		.select('room user')
		.exec(function (err, result) {
			if (err) {
				return callback(err);
			}
			// Filter by active..
			// Filter by is_private is false or the user has access to the room
			let actives = result.filter(r => (r.room !== null));

			// Taking the IDS
			let users = [];
			actives.map((r, index) => { users[index] = r.user });

			return callback(err, users);
		});
};

var addMessage = function (user_id, room_id, data, callback) {

	findOrCreate({
		user_id: user_id,
		room_id: room_id
	}, function (err, user_room) {
		if (err) {
			return callback(err);
		}
		let message = new MessageModel(data);
		message.userRoom = user_room;
		message.save(callback);
	});
};

var updateMessage = function (message_id, data, callback) {

	MessageModel
		.findByIdAndUpdate(message_id, data, callback);
};

module.exports = {
	create,
	findOrCreate,
	myPublicRooms,
	messages,
	users,
	addMessage,
	updateMessage,
};
