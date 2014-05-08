var express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    socket = require('./core/server/lib/service/socket');

var app = express(),
    server = http.createServer(app),
    io = socketio.listen(server);

app.use(express.static(__dirname + '/dist'));

app.get('/', function (request, response) {
  response.sendfile('index.html');
});

io.on('connection', socket);
server.listen(process.env.PORT || 3000);
