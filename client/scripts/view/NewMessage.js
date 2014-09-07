'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  /**
   * @type {String}
   */
  className: 'new-message',

  /**
   * @type {String}
   */
  template: require('../template/newMessage.hbs'),

  /**
   * @type {Object}
   */
  events: {
    'keypress input': 'persistEntry'
  },

  /**
   * Gets the messages and current user
   * @param  {Object} options
   */
  initialize: function (options) {
    this.user = options.user;
  },

  /**
   * Chooses to set users name or add a message
   * @param  {Object} event
   */
  persistEntry: function (event) {
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();
      var isLoggedIn = this.user.has('name');
      this[!isLoggedIn ? 'setName' : 'addMessage'](event.target.value);
      this.render();
    }
  },

  /**
   * Sets the current users name
   * @param {String} name
   */
  setName: function (name) {
    this.user.set('name', name);
    this.trigger('name:set', this.user);
  },

  /**
   * Adds a message from the current user
   * @param {String} message
   */
  addMessage: function (message) {
    this.collection.add({
      type: 'to',
      user: this.user,
      message: message
    });

    this.trigger('message:add', message);
  },

  /**
   * Returns a placeholder for the text input
   * @return {String}
   */
  placeholder: function () {
    return !this.user.has('name') ?
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
