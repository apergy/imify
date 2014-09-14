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
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();
      this.collection.sendMessage(event.target.value);
      event.target.value = '';
    }
  },

  /**
   * Focuses user cursor on input
   */
  onRender: function () {
    _.defer(function (that) {
      that.$('input').focus();
    }, this);
  }
});
