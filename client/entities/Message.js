'use strict';

var _ = require('underscore'),
    Backbone = require('backbone'),
    entity = require('./../factory/entity'),
    service = require('./../factory/service');

module.exports = Backbone.Model.extend({
  /**
   * @type {Object}
   */
  defaults: {
    readers: []
  },

  /**
   * Gets the current user and socket
   */
  initialize: function () {
    this.user = entity.getCurrentUser();
    this.socket = service.getSocket();
  },

  /**
   * Returns the index of current model in collection
   * @return {Integer}
   */
  getIndex: function () {
    return this.collection.indexOf(this);
  },

  /**
   * Returns the model previous to this one in collection
   * @return {Backbone.Model}
   */
  getPrevious: function () {
    return this.collection.at(this.getIndex() - 1);
  },

  /**
   * Returns if the previous message is by the same user
   * @return {Boolean}
   */
  samePreviousUser: function () {
    var previous = this.getPrevious();
    return !!previous && previous.has('user') && this.has('user') &&
      previous.get('user').name === this.get('user').name;
  },

  /**
   * Returns the direction type of message
   * @return {String}
   */
  getType: function () {
    return this.user.id === this.get('user').id ? 'to' : 'from';
  },

  /**
   * Prepends a 0 to the number if < 10
   * @param  {String} number
   * @return {String} e.g "06"
   */
  pad: function (number) {
    return (parseInt(number, 10) < 10 ? '0' : '') + number;
  },

  /**
   * Returns formatted 24hr time for the message
   * @return {String} e.g "22:03"
   */
  getFormattedTime: function () {
    var date = new Date(this.get('datetime'));
    return _.map([ date.getHours(), date.getMinutes() ], this.pad).join(':');
  },

  /**
   * Returns all model attributes plus some useful things
   * @return {Object}
   */
  toJSON: function () {
    var message = Backbone.Model.prototype.toJSON.call(this);
    return _.extend({}, message, {
      formattedTime: this.getFormattedTime(),
      samePreviousUser: this.samePreviousUser()
    });
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
