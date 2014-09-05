'use strict';

module.exports = function (socket) {
  socket.on('user:join', function (data) {
    socket.broadcast.emit('user:join', data);
  });

  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', data);
  });
};
