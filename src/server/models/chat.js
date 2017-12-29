'use strict';

var moment = require('moment');

var UserRoomModel = require('../database').models.user_has_room;
var MessageModel = require('../database').models.message;
var RoomModel = require('../database').models.room;
var UserModel = require('../database').models.user;

/**
 * 
 * @param {object} data 
 * @param {function} callback 
 */
var create = function (data, callback) {
	var newUserRoom = new UserRoomModel(data);
	newUserRoom.save(callback);
};

/**
 * Find or create a new user_room from rooms chat
 * @param {object} data 
 * @param {function} callback 
 */
var findOrCreate = function (data, callback) {
	UserRoomModel.findOne({
		$or: [
			{ $and: [{ user: data.user_id, from: data.from_id }] },
			{ $and: [{ user: data.from_id, from: data.user_id }] },
		]
	})
		.populate('user')
		.populate('from')
		.exec(function (err, chat) {
			if (err) { return callback(err); }
			if (chat) {
				return callback(err, chat);
			} else {
				var chatData = {
					user: data.user_id,
					from: data.from_id
				};
				create(chatData, callback);
			}
		});
}


/**
 * 
 * @param {string} id 
 * @param {object} data 
 * @param {function} callback 
 */
var myChats = function (id, data, callback) {
	UserRoomModel
		.find({
			$or:
				[
					{ user: id },
					{ from: id }
				]
		})

		.populate('user')
		.populate('from')

		.limit(data.limit)
		.skip(data.offset)
		.sort('create_at')

		.exec(callback);
};

/**
 * Return all the messages
 * @param {string} roomId 
 * @param {object} data 
 * @param {function} callback 
 */
var messages = function (chatId, data, callback) {
	let offset = parseInt(data.offset),
		limit = parseInt(data.limit);

	MessageModel
		.where('userRoom').equals(chatId)
		.populate('user')
		.populate('from')
		.sort({ created_at: -1 })
		.skip(offset)
		.limit(limit)
		.lean() // Return simple javascript objects.
		.exec(function (err, messages) {
			if (err) { return callback(err); }

			//Filling importan properties
			messages.forEach(m => { m.date = moment(m.created_at).utc().format(); });

			messages.reverse();

			callback(err, messages);
		});
};

// /**
//  * 
//  * @param {*} roomId 
//  * @param {*} callback 
//  */
// var users = function (roomId, callback) {
// 	UserRoomModel
// 		.where('room').equals(roomId)
// 		.populate('room', 'icon', { 'settings.is_active': true, 'deleted_at': null })
// 		.populate('user')
// 		.select('room user')
// 		.exec(function (err, result) {
// 			if (err) {
// 				return callback(err);
// 			}
// 			// Filter by active..
// 			// Filter by is_private is false or the user has access to the room
// 			let actives = result.filter(r => (r.room !== null));

// 			// Taking the IDS
// 			let users = [];
// 			actives.map((r, index) => { users[index] = r.user });

// 			return callback(err, users);
// 		});
// };

/**
 * Add a message to the room
 * @param {string} user_id 
 * @param {string} from_id 
 * @param {object} data The Message Model
 * @param {function} callback 
 */
var addMessage = function (user_id, from_id, data, callback) {

	findOrCreate({
		user_id: user_id,
		from_id: room_id
	}, function (err, chat) {
		if (err) { return callback(err); }
		let message = new MessageModel(data);
		message.userRoom = chat;
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

// /**
//  * Is like personal chat between two people
//  * @param {*} ownerId 
//  * @param {*} userId 
//  * @param {*} callback 
//  */
// var privateMessage = function (owner, userId, callback) {
// 	if (owner.id === userId) {
// 		return callback(new Error());
// 	}

// 	UserModel.findById(userId, function (err, user) {
// 		if (err) { return callback(err); }
// 		RoomModel
// 			.where('settings.is_active').equals(true)
// 			.where('settings.is_private').ne(false)
// 			.where('settings.is_private').in([ownerId, userId])
// 			.limit(1)
// 			.exec(function (err, rooms) {
// 				if (err) { return callback(err); }
// 				if (rooms.length > 0) { return callback(err, rooms[0]); }

// 				let rm = new RoomModel({
// 					title: 'private-message',
// 					description: '',
// 					icon: '',
// 					settings: {
// 						message_require_approval: false, // Admin or moderator needs to aprove the messages.
// 						is_active: true, // Is the rooms active?
// 						is_private: [ownerId, userId] // False if is not private room. Array of users ID if is a private room. Private messages live here
// 					}
// 				});

// 				rm.save(callback);
// 			});
// 	});
// }

module.exports = {
	create,
	findOrCreate,
	myChats,
	messages,
	// users,
	addMessage,
	updateMessage,
	// privateMessage,
};
