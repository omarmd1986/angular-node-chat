var Pusher = require('pusher');

var config = require('../config');

var pusher = new Pusher(config.pusherOptions);

// Creating all chat rooms.
var sendMessage = function(room, message, callback){
    pusher.trigger(room, 'message', message, null, callback);
};

module.exports = {
    sendMessage,
    pusher
};
