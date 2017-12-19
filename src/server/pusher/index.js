var Pusher = require('pusher');

var config = require('../config');

var pusher = new Pusher(config.pusherOptions);

var sendMessage = function(room, message, callback){
    pusher.trigger(`presence-${room}`, 'message', message, null, callback);
    // Send all online users register in that room a notification.
};

module.exports = {
    sendMessage,
    pusher
};
