'use strict';

var UserHasRoomModel = require('../database').models.user_has_room;

var create = function (data, callback) {
	var newUser = new UserHasRoomModel(data);
	newUser.save(callback);
};

var findOrCreate = function (data, callback) {
	UserHasRoomModel.findOne({
		user: data.user_id,
		room: data.room_id
	}, function (err, user_room) {
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
	UserHasRoomModel
		.where('user').equals(id)
		.populate('room')
		.where('room.settings.is_active').equals(true)
		.exec(callback);
};

module.exports = {
	create,
	findOrCreate,
	myPublicRooms
};
