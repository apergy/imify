'use strict';

var _ = require('underscore'),
    Users = require('./../entities/Users'),
    Messages = require('./../entities/Messages');

var rooms = {};

module.exports = function (roomId, socket) {
  var room = rooms[roomId];

  if (room === undefined) {
    room = rooms[roomId] = {
      users: new Users(),
      messages: new Messages()
    };
  }

  socket.on('users:read', function (data, callback) {
    callback(room.users.toJSON());
  });

  socket.on('users:create', function (data, callback) {
    var user = room.users.add(_.extend({ id: socket.id }, data));
    socket.broadcast.emit('users:create', user.toJSON());
    callback(user.toJSON());
  });

  socket.on('disconnect', function () {
    var user = room.users.findWhere({ id: socket.id });

    if (user) {
      room.users.remove([ user ]);
      socket.broadcast.emit('users:delete', user.toJSON());
    }
  });

  socket.on('messages:create', function (data) {
    var message = room.messages.add(data);
    socket.broadcast.emit('messages:create', message.toJSON());

    // Start removing older messages
    if (room.messages.length > 50) {
      room.messages.remove(room.messages.first(room.messages.length - 50));
    }
  });

  socket.on('messages:read', function (data, callback) {
    callback(room.messages.toJSON());
  });

  socket.on('message:send', function (data) {
    socket.broadcast.emit('message:send', data);
  });
};
