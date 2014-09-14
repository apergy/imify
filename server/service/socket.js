'use strict';

var _ = require('underscore'),
    users = {};

module.exports = function (socket) {
  socket.on('users:read', function (data, callback) {
    callback(_.values(users));
  });

  socket.on('user:join', function (data) {
    users[socket.id] = _.extend({ id: socket.id }, data);
    socket.broadcast.emit('user:join', users[socket.id]);
  });

  socket.on('disconnect', function () {
    if (users[socket.id]) {
      socket.broadcast.emit('user:leave', users[socket.id]);
      users[socket.id] = undefined;
      delete users[socket.id];
    }
  });

  socket.on('message:send', function (data) {
    socket.broadcast.emit('message:send', data);
  });
};
