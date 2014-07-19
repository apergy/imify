'use strict';

var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    socketService = require('./core/lib/server/service/socket');

app.use(express.static(__dirname + '/dist'));

app.get('/', function (request, response) {
  response.sendfile('index.html');
});

io.on('connection', socketService);
server.listen(process.env.PORT || 3000);
