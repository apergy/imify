@imifyApp.factory 'socket', ($rootScope) ->
  socket = io.connect()

  on: (name, callback) ->
    socket.on name, () ->
      args = arguments
      $rootScope.$apply ()->
        callback.apply socket, args

  emit: (name, data) ->
    socket.emit name, data
