'use strict';

var Backbone = require('backbone'),
    io = require('socket.io-client'),
    entity = require('./../factory/entity');

module.exports = Backbone.View.extend({
  /**
   * @type {String}
   */
  className: 'new-message',

  /**
   * @type {String}
   */
  template: require('./../template/newMessage.hbs'),

  /**
   * @type {Object}
   */
  events: {
    'keypress input': 'persistEntry'
  },

  /**
   * Gets the messages and current user
   */
  initialize: function () {
    this.socket = io.connect();
    this.collection = entity.getMessages();
    this.currentUser = entity.getCurrentUser();
  },

  /**
   * Chooses to set users name or add a message
   * @param  {Object} event
   */
  persistEntry: function (event) {
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();
      var isLoggedIn = this.currentUser.has('name');
      this[!isLoggedIn ? 'setName' : 'addMessage'](event.target.value);
      this.render();
    }
  },

  /**
   * Sets the current users name
   * @param {String} name
   */
  setName: function (name) {
    this.currentUser.set('name', name);
    this.socket.emit('user:join', {
      user: this.currentUser.toJSON()
    });
  },

  /**
   * Adds a message from the current user
   * @param {String} message
   */
  addMessage: function (message) {
    this.collection.add({
      type: 'to',
      user: this.currentUser,
      message: message
    });

    this.socket.emit('send:message', {
      type: 'from',
      user: this.currentUser.toJSON(),
      message: message
    });
  },

  /**
   * Returns a placeholder for the text input
   * @return {String}
   */
  placeholder: function () {
    return !this.currentUser.has('name') ?
      'Whats your name?' :
      'Enter a message...';
  },

  /**
   * Renders the template with context
   * @return {Backbone.View}
   */
  render: function () {
    this.$el.html(this.template(this));
    this.$('input').focus();
    return this;
  }
});
