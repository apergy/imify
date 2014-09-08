'use strict';

var _ = require('underscore'),
    io = require('socket.io-client');

module.exports = {
  /**
   * @type {Object}
   */
  cache: {},

  /**
   * Returns the current user
   * @return {Backbone.Model}
   */
  getSocket: function () {
    var chatId = _.last(window.location.pathname.split('/'));
    return this.cache.socket || (this.cache.socket = io.connect('/' + chatId));
  }
};
