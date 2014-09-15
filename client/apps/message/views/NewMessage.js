'use strict';

var _ = require('underscore'),
    Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  /**
   * @type {String}
   */
  className: 'new-message',

  /**
   * @type {String}
   */
  template: require('./../templates/newMessage.hbs'),

  /**
   * @type {Object}
   */
  events: {
    'keypress input': 'sendMessage'
  },

  /**
   * Chooses to set users name or add a message
   * @param  {Object} event
   */
  sendMessage: function (event) {
    this.typingStarted();
    this.typingStopped();

    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();
      this.collection.sendMessage(event.target.value);
      event.target.value = '';
    }
  },

  typingStarted: _.debounce(function () {
    this.trigger('typing:started');
  }, 500, true),

  typingStopped: _.debounce(function () {
    this.trigger('typing:stopped');
  }, 500),

  /**
   * Focuses user cursor on input
   */
  onRender: function () {
    _.defer(function (that) {
      that.$('input').focus();
    }, this);
  }
});
