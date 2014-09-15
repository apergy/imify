'use strict';

var _ = require('underscore'),
    Backbone = require('backbone'),
    service = require('./../factory/service');

module.exports = Backbone.Collection.extend({
  /**
   * @type {Backbone.Model}
   */
  model: require('./User'),

  /**
   * @type {String}
   */
  comparator: 'name',

  /**
   * Gets the socket and listens to joiners and leavers
   */
  initialize: function () {
    this.socket = service.getSocket();
    this.socket.on('users:create', _.bind(this.addUser, this));
    this.socket.on('users:delete', _.bind(this.removeUser, this));
    this.socket.on('typing:started', _.bind(this.typingStarted, this));
    this.socket.on('typing:stopped', _.bind(this.typingStopped, this));
  },

  /**
   * Adds the joined user
   * @param {Object} user
   */
  addUser: function (user) {
    this.add(user);
  },

  /**
   * Removes the leaving user
   * @param  {Object} user
   */
  removeUser: function (user) {
    this.remove([ this.findWhere({ name: user.name }) ]);
  },

  /**
   * Emits sync events via socket for CRUD actions
   * @param  {String} type
   * @param  {Backbone.Collection} entity
   * @param  {Object} options
   */
  sync: function (type, entity, options) {
    this.socket.emit('users:' + type, entity.toJSON(), options.success);
  },

  /**
   * Sets the user typing flag
   * @param  {Object} data
   */
  typingStarted: function (data) {
    var user = this.findWhere({ id: data.id });
    user.set('typing', true);
  },

  /**
   * Unsets the user typing flag
   * @param  {Object} data
   */
  typingStopped: function (data) {
    var user = this.findWhere({ id: data.id });
    user.set('typing', false);
  }
});
