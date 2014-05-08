'use strict';

var Backbone = require('backbone'),
    io = require('socket.io-browserify'),
    User = require('./../model/user');

module.exports = Backbone.Collection.extend({
  /**
   * @type {Backbone.Model}
   */
  model: require('./../model/message'),

  /**
   * [initialize description]
   * @param  {[type]} models  [description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  initialize: function (models, options) {
    this.socket = io.connect();
    this.socket.on('send:message', this.recieveMessage.bind(this));
    this.on('add', this.sendMessage, this);
  },

  /**
   * Adds a new message recieved from socket
   * @param {Object} data
   */
  recieveMessage: function (data) {
    this.add({
      user: new User(data.user),
      message: data.message
    });
  },

  sendMessage: function (model, collection, options) {
    if (options.send) {
      this.socket.emit('send:message', model.toJSON());
    }
  }
});
