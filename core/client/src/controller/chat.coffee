@imifyApp.controller 'chatCtrl', ($scope, socket) ->
  $scope.name = ''
  $scope.users = []
  $scope.message = ''
  $scope.messages = []

  socket.on 'init', (data) ->
    $scope.users = data.users

  socket.on 'send:message', (message) ->
    $scope.messages.push message

  socket.on 'change:name', (data) ->
    renameUser data.oldName, data.newName

  socket.on 'user:join', (data) ->
    $scope.messages.push
      user: 'root'
      text: data.name + ' has joined.'
    $scope.users.push data.name
    console.log $scope.messages

  socket.on 'user.left', (data) ->
    $scope.messages.push
      user: 'root'
      text: data.name + ' has left.'

  renameUser = (oldName, newName) ->
    index = $scope.users.indexOf oldName
    $scope.users[index] = newName

  $scope.setName = () ->
    data = name: $scope.newName
    $scope.name = $scope.newName
    $scope.newName = ''
    socket.emit 'user:join', data

  $scope.sendMessage = () ->
    data =
      user: $scope.name
      text: $scope.message
    $scope.messages.push data
    socket.emit 'send:message', data
    $scope.message = ''
