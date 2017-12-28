var Pusher = require('pusher');

var config = require('../config');

var pusher = new Pusher(config.pusherOptions);

/**
 * Send a text message to the channel name room
 * @param {string} room the name of the channel
 * @param {string} message 
 * @param {function} callback 
 */
var sendMessage = function(room, message, callback){
    pusher.trigger(`presence-${room}`, 'message', message, null, callback);
    // Send all online users register in that room a notification.
};

/**
 * Send a force log out signal
 * @param {string} userId 
 */
var banned = function(userId){
    pusher.trigger(userId, 'banned');
}

module.exports = {
    sendMessage,
    pusher,
    banned
};
