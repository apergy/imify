module.exports = (socket) ->
  socket.on 'user:join', (data) ->
    socket.broadcast.emit 'user:join', data

  socket.on 'send:message', (data) ->
    socket.broadcast.emit 'send:message', data
