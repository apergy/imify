express = require 'express'
http = require 'http'
socketio = require 'socket.io'
hbs = require 'hbs'

app = express()
server = http.createServer app
io = socketio.listen server

app.use express.static __dirname + '/dist'
app.engine 'hbs', hbs.__express
app.set 'view engine', 'hbs'
app.set 'views', __dirname + '/core/server/src/view'

app.get '/', (request, response) ->
  response.render 'index'

server.listen process.env.PORT || 3000
