imifyApp.controller('chatCtrl', function ($scope, socket) {
  $scope.name = '';
  $scope.users = [];
  $scope.message = '';
  $scope.messages = [];

  var renameUser = function (oldName, newName) {
        var index = $scope.users.indexOf(oldName);
        $scope.users[index] = newName;
      },
      scrollToBottom = function () {
        setTimeout(function () {
          $('html, body').animate({
            scrollTop: $(document).height() - $(window).height()
          });
        }, 50);
      };

  socket.on('init', function (data) {
    $scope.users = data.users;
  });

  socket.on('send:message', function (message) {
    message.type = ($scope.name === message.user) ? 'to' : 'from';
    $scope.messages.push(message);
    scrollToBottom();
  });

  socket.on('change:name', function (data) {
    renameUser(data.oldName, data.newName);
  });

  socket.on('user:join', function (data) {
    $scope.messages.push({
      type: 'system',
      text: data.name + ' has joined.'
    });

    $scope.users.push(data.name);
    scrollToBottom();
  });

  socket.on('user:left', function (data) {
    $scope.messages.push({
      type: 'system',
      text: data.name + ' has left.'
    });
    scrollToBottom();
  });


  $scope.setName = function () {
    var data = { name: $scope.newName };
    $scope.name = $scope.newName;
    $scope.newName = '';
    socket.emit('user:join', data);
  };

  $scope.sendMessage = function () {
    var data = {
      user: $scope.name,
      text: $scope.message
    };

    socket.emit('send:message', data);
    data.type = 'to';
    $scope.messages.push(data);
    $scope.message = '';
    scrollToBottom();
  };
});
