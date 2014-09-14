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
  url: 'users',

  /**
   * @type {String}
   */
  comparator: 'name',

  /**
   * Gets the socket and listens to joiners and leavers
   */
  initialize: function () {
    this.socket = service.getSocket();
    this.socket.on('user:join', _.bind(this.addUser, this));
    this.socket.on('user:leave', _.bind(this.removeUser, this));
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
    this.socket.emit(this.url + ':' + type, entity.toJSON(), options.success);
  }
});
