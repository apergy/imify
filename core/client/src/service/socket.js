imifyApp.factory('socket', function ($rootScope) {
  var socket = io.connect();

  return {
    /**
     * Sets a listener with provided callback
     *
     * @param  {String}   name
     * @param  {Function} callback
     */
    on: function (name, callback) {
      socket.on(name, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },

    /**
     * Emits an event onwards with same name and data
     *
     * @param  {String} name
     * @param  {Object} data
     */
    emit: function (name, data) {
      socket.emit(name, data);
    }
  };
});
