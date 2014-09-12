'use strict';

var _ = require('underscore');

module.exports = function (socket) {
  var users = {};

  socket.on('user:join', function (data) {
    users[socket.id] = _.extend({ id: socket.id }, data);
    socket.broadcast.emit('user:join', users[socket.id]);
  });

  socket.on('disconnect', function () {
    socket.broadcast.emit('user:leave', users[socket.id]);
    users[socket.id] = undefined;
    delete users[socket.id];
  });

  socket.on('message:send', function (data) {
    socket.broadcast.emit('message:send', data);
  });
};
