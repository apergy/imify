'use strict';

var Backbone = require('backbone'),
    io = require('socket.io-client'),
    User = require('../model/user');

module.exports = Backbone.Collection.extend({
  /**
   * @type {Backbone.Model}
   */
  model: require('./../model/message'),

  /**
   * Gets the socket connections and listens for messages
   */
  initialize: function () {
    this.socket = io.connect('/' + window.location.pathname.split('/')[2]);
    this.socket.on('user:join', this.announceUser.bind(this));
    this.socket.on('send:message', this.recieveMessage.bind(this));
  },

  /**
   * Announces a new user has joined
   * @param  {Object} data
   */
  announceUser: function (data) {
    this.add({
      type: 'system',
      user: new User(data.user)
    });
  },

  /**
   * Adds a new message recieved from socket
   * @param {Object} data
   */
  recieveMessage: function (data) {
    this.add({
      type: 'from',
      user: new User(data.user),
      message: data.message
    });
  }
});
