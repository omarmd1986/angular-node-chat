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
	UserHasRoomModel
		.where('user').equals(id)
		.populate('room', null, {'settings.is_active': true, 'deleted_at' : null})
		.exec(function(err, result){
			if(err){
				return callback(err, null);
			}
			// Filter by active..
			// Filter by is_private is false or the user has access to the room
			let actives = result.filter(r => (r.room !== null && (r.room.settings.is_private == false || r.room.settings.is_private.indexOf(id) !== -1 ) ));
			// Taking only the room
			let rooms = actives.map((r, index) => actives[index] = r.room);
			callback(null, rooms);
		});
};

var updateStatus = function(user, room, status, callback){
	UserHasRoomModel.findOne({
		user: user,
		room: room
	}, function (err, user_room) {
		if(err){
			return callback(err, null);
		}
		user_room[status] = Date.now;
		user_room.save(callback);
	});
};

module.exports = {
	create,
	findOrCreate,
	myPublicRooms,
	updateStatus
};
