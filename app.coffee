express = require 'express'
http = require 'http'
socketio = require 'socket.io'

app = express()
server = http.createServer app
io = socketio.listen server

app.use express.static __dirname + '/dist'

app.get '/', (request, response) ->
  response.render 'index.html'

server.listen process.env.PORT || 3000
