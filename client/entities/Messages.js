'use strict';

var _ = require('underscore'),
    Backbone = require('backbone'),
    entity = require('./../factory/entity'),
    service = require('./../factory/service');

module.exports = Backbone.Collection.extend({
  /**
   * @type {Backbone.Model}
   */
  model: require('./Message'),

  /**
   * @type {String}
   */
  url: 'messages',

  /**
   * Gets the current user, socket and listens to new messages
   */
  initialize: function () {
    this.user = entity.getCurrentUser();
    this.user.on('changed:focused', this.toggleTitle, this);

    this.socket = service.getSocket();
    this.socket.on('messages:create', _.bind(this.recieveMessage, this));
  },

  /**
   * Sends the the new message
   * @param {String} message
   */
  sendMessage: function (message) {
    this.create({
      message: message,
      user: this.user.toJSON(),
      datetime: JSON.parse(JSON.stringify(new Date()))
    });
  },

  /**
   * Receives the new message
   * @param  {Object} message
   */
  recieveMessage: function (message) {
    this.add(message);
  },

  /**
   * Emits sync events via socket for CRUD actions
   * @param  {String} type
   * @param  {Backbone.Collection} entity
   * @param  {Object} options
   */
  sync: function (type, entity, options) {
    this.socket.emit('messages:' + type, entity.toJSON(), options.success);
  }
});
