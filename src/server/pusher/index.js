var Pusher = require('pusher');

var config = require('../config');

var pusher = new Pusher(config.pusherOptions);

/**
 * Send a text message to the channel name room
 * @param {string} room the name of the channel
 * @param {string} message 
 * @param {function} callback 
 */
var sendMessage = function (loginUser, room, message, callback) {
    let roomId = room.id;
    pusher.trigger(`presence-${roomId}-room`, 'message', message, null, callback);
    // Send all online users register in that room a notification.
    room.populate('users', function (err, users) {
        if (err) { return; }
        users.forEach(userroom => {
            pusher.trigger(`precence-${userroom.user}-system`, 'new_room_message', { sendId: loginUser.id, sendName: loginUser.username, roomId: roomId, roomTitle: chat.title});
        });
    });
};

var sendChatMessage = function (loginUser, chat, message, callback) {
    let chatId = chat.id;
    pusher.trigger(`presence-${chatId}-chat`, 'message', message, null, callback);

    // Send the other user a notifications
    pusher.trigger(`precence-${chat.user}-system`, 'new_chat_message', { sendId: loginUser.id, sendName: loginUser.username, chatId: chatId});
    pusher.trigger(`precence-${chat.from}-system`, 'new_chat_message', { sendId: loginUser.id, sendName: loginUser.username, chatId: chatId});
};

/**
 * Send a force log out signal
 * @param {string} userId 
 */
var banned = function (userId) {
    pusher.trigger(`precence-${userId}-system`, 'banned');
}

/**
 * Send a force log out signal
 * @param {string} userId 
 */
var roomBanned = function (userId, roomId) {
    pusher.trigger(`precence-${userId}-system`, 'banned_room', {roomId: roomId});
}

module.exports = {
    sendMessage,
    sendChatMessage,
    pusher,
    banned,
    roomBanned,
};
