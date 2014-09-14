'use strict';

var _ = require('underscore'),
    Users = require('./../entities/Users'),
    Messages = require('./../entities/Messages');

var users = new Users(),
    messages = new Messages();

module.exports = function (socket) {
  socket.on('users:read', function (data, callback) {
    callback(users.toJSON());
  });

  socket.on('users:create', function (data, callback) {
    var user = users.add(_.extend({ id: socket.id }, data));
    socket.broadcast.emit('users:create', user.toJSON());
    callback(user.toJSON());
  });

  socket.on('disconnect', function () {
    var user = users.findWhere({ id: socket.id });

    if (user) {
      users.remove([ user ]);
      socket.broadcast.emit('users:delete', user.toJSON());
    }
  });

  socket.on('messages:create', function (data) {
    var message = messages.add(data);
    socket.broadcast.emit('messages:create', message.toJSON());
  });

  socket.on('messages:read', function (data, callback) {
    callback(messages.toJSON());
  });

  socket.on('message:send', function (data) {
    socket.broadcast.emit('message:send', data);
  });
};
