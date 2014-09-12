'use strict';

module.exports = function (socket) {
  socket.on('user:join', function (data) {
    socket.broadcast.emit('user:join', data);
  });

  socket.on('message:send', function (data) {
    socket.broadcast.emit('message:send', data);
  });
};
