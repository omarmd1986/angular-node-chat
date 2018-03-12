'use strict';

var roomModel = require('../database').models.room;
var User = require('../models/user');

var create = function (data, callback) {
	var newRoom = new roomModel(data);
	newRoom.save(callback);
};

var find = function (data, callback) {
	roomModel.find(data, callback);
}

var findOne = function (data, callback) {
	roomModel.findOne(data, callback);
}

var findById = function (id, callback) {
	roomModel.findById(id, callback);
}

var findByIdAndUpdate = function (id, data, callback) {
	roomModel.findByIdAndUpdate(id, data, { new: true }, callback);
}

var toggle = function (id, options, callback) {
	findById(id, function (err, room) {
		if (err) {
			callback(err, null);
		}
		room.toggle(options);
		// Save the ban status.
		room.save(callback);
	});
};

/**
 * Return all the public room in the system
 * @param {object} data 
 * @param {function} callback 
 */
var allPublicRooms = function (data, callback) {
	roomModel
		.where('deleted_at').equals(null)
		.where('settings.is_active').equals(true)
		.where('settings.is_private').equals(false)
		.limit(data.limit)
		.skip(data.offset)
		.exec(callback);
};

/**
 * For admins
 * */
var allRooms = function (data, callback) {
	let limit = parseInt(data.limit),
		offset = parseInt(data.offset);
	roomModel
		.where('deleted_at').equals(null)
		.where('settings.is_private').equals(false)
		.limit(limit)
		.skip(offset)
		.exec(callback);
};

module.exports = {
	create,
	find,
	findOne,
	findById,
	toggle,
	allPublicRooms,
	allRooms
};