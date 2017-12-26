'use strict';

var moment = require('moment');

var UserRoomModel = require('../database').models.user_has_room;
var MessageModel = require('../database').models.message;
var RoomModel = require('../database').models.room;
var UserModel = require('../database').models.user;

/**
 * 
 * @param {*} data 
 * @param {*} callback 
 */
var create = function (data, callback) {
	var newUserRoom = new UserRoomModel(data);
	newUserRoom.save(callback);
};

/**
 * 
 * @param {*} data 
 * @param {*} callback 
 */
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

/**
 * 
 * @param {*} id 
 * @param {*} callback 
 */
var myPublicRooms = function (id, callback) {
	UserRoomModel
		.where('user').equals(id)
		.populate('room', null, { 'settings.is_active': true, 'settings.is_private': false, 'deleted_at': null })
		.select('room')
		.exec(function (err, result) {
			if (err) {
				return callback(err, null);
			}
			// Filter by active..
			// Filter by is_private is false or the user has access to the room
			let actives = result.filter(r => (r.room !== null));
			// Taking only the room
			let rooms = actives.map((r, index) => actives[index] = r.room);
			callback(null, rooms);
		});
};

var myChats = function (id, callback) {
	UserRoomModel
		.where('user').equals(id)
		.populate('room', null, { 'settings.is_active': true, 'settings.is_private': {$ne: false}, 'deleted_at': null })
		.select('room')
		.exec(function (err, result) {
			if (err) {
				return callback(err, null);
			}
			// Filter by active..
			// Filter by is_private is false or the user has access to the room
			let actives = result.filter(r => (r.room !== null && r.room.settings.is_private.indexOf(id) !== -1));
			// Taking only the room
			let rooms = actives.map((r, index) => actives[index] = r.room);
			callback(null, rooms);
		});
};

/**
 * 
 * @param {*} roomId 
 * @param {*} data 
 * @param {*} callback 
 */
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

/**
 * 
 * @param {*} roomId 
 * @param {*} callback 
 */
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

/**
 * 
 * @param {*} user_id 
 * @param {*} room_id 
 * @param {*} data 
 * @param {*} callback 
 */
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

/**
 * 
 * @param {*} message_id 
 * @param {*} data 
 * @param {*} callback 
 */
var updateMessage = function (message_id, data, callback) {
	MessageModel
		.findByIdAndUpdate(message_id, data, callback);
};

/**
 * Is like personal chat between two people
 * @param {*} ownerId 
 * @param {*} userId 
 * @param {*} callback 
 */
var privateMessage = function (ownerId, userId, callback) {
	if (ownerId === userId) {
		return callback(new Error());
	}

	UserModel.findById(userId, function (err, user) {
		if(err){ return callback(err); }
		RoomModel
			.where('settings.is_active').equals(true)
			.where('settings.is_private').ne(false)
			.where('settings.is_private').in([ownerId, userId])
			.limit(1)
			.exec(function (err, rooms) {
				if (err) { return callback(err); }
				if (rooms.length > 0) { return callback(err, rooms[0]); }

				let rm = new RoomModel({
					title: user.username,
					description: '',
					icon: user.picture,
					settings: {
						message_require_approval: false, // Admin or moderator needs to aprove the messages.
						is_active: true, // Is the rooms active?
						is_private: [ownerId, userId] // False if is not private room. Array of users ID if is a private room. Private messages live here
					}
				});

				rm.save(callback);
			});
	});
}

module.exports = {
	create,
	findOrCreate,
	myPublicRooms,
	myChats,
	messages,
	users,
	addMessage,
	updateMessage,
	privateMessage,
};
