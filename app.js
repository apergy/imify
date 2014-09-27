'use strict';

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    crypto = require('crypto'),
    _ = require('underscore'),
    socketService = require('./server/service/socket');

app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response) {
  crypto.randomBytes(4, function (ex, buf) {
    response.redirect('/chat/' + buf.toString('hex'));
  });
});

var rooms = {};

app.get('/chat/:id', function (request, response) {
  var roomId = request.params.id,
      room = rooms[roomId];

  // We only want to place a listener for
  // new connections on each room the once
  if (room === undefined) {
    room = rooms[roomId] = io.of('/' + roomId);
    room.on('connection', _.partial(socketService, roomId));
  }

  response.sendfile('index.html');
});

server.listen(process.env.PORT || 3000);
