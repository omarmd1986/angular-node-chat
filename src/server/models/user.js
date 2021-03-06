'use strict';

var userModel = require('../database').models.user;

var create = function (data, callback) {
	var newUser = new userModel(data);
	newUser.save(callback);
};

var findOne = function (data, callback) {
	userModel.findOne(data, callback);
}

var findById = function (id, callback) {
	userModel.findById(id, callback);
}

var toggle = function (id, options, callback) {
	findById(id, function (err, user) {
		if (err) {
			callback(err, null);
		}
		user.toggle(options);
		// Save the ban status.
		user.save(callback);
	});
};

var findAll = function (offset, limit, callback) {
	offset = offset || 0;
	limit = limit || 100;
	userModel
		.find()
		.skip(offset)
		.limit(limit)
		.exec(callback);
};

var findOrCreate = function (data, callback) {
	findOne({ 'socialId': data.id }, function (err, user) {
		if (err) { return callback(err); }
		if (user) {
			return callback(err, user);
		} else {
			var userData = {
				username: data.displayName,
				socialId: data.id,
				provider: data.provider,
				picture: data.photos[0].value || null
			};

			// To avoid expired Facebook CDN URLs
			// Request user's profile picture using user id 
			// @see http://stackoverflow.com/a/34593933/6649553
			if (data.provider == "facebook" && userData.picture) {
				userData.picture = "http://graph.facebook.com/" + data.id + "/picture?type=large";
			}

			create(userData, function (err, newUser) {
				callback(err, newUser);
			});
		}
	});
}

var updateStatus = function(user_id, ptr, callback){
	let obj = new Object();
	obj[ptr] = Date.now();
	userModel.findByIdAndUpdate(user_id, obj, callback);
};

module.exports = {
	create,
	findOne,
	findById,
	findOrCreate,
	toggle,
	findAll,
	updateStatus,
};
