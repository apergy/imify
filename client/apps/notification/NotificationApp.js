'use strict';

var Marionette = require('backbone.marionette'),
    entity = require('./../../factory/entity'),
    service = require('./../../factory/service'),
    _ = require('underscore');

module.exports = Marionette.Controller.extend({
  /**
   * Shows the new user view
   */
  initialize: function () {
    this.defaultTitle = document.title;
    this.user = entity.getCurrentUser();

    this.socket = service.getSocket();
    this.socket.on('messages:create', _.bind(this.notifyUser, this));

    window.addEventListener('focus', _.bind(this.userFocused, this));
    window.addEventListener('blur', _.bind(this.userBlured, this));
  },

  /**
   * Sets the user as focused
   */
  userFocused: function () {
    this.user.set('focused', true);
  },

  /**
   * Sets the user as unfocused
   */
  userBlured: function () {
    this.user.set('focused', false);
  },

  /**
   * If the user is not focus on window it will
   * start a blinking page title notification
   * @param  {Object} message
   */
  notifyUser: function (message) {
    if (!this.user.get('focused')) {
      clearInterval(this.titleInterval);
      this.notificationTitle = message.user.name + ' sent you a message...';
      this.titleInterval = setInterval(_.bind(this.toggleTitle, this), 1000);
    }
  },

  /**
   * Toggles the title from default to notification
   * NOTE: When user is re-focused it resets the title
   */
  toggleTitle: function () {
    document.title = document.title === this.defaultTitle ?
      this.notificationTitle : this.defaultTitle;

    if (this.user.get('focused')) {
      this.resetTitle();
    }
  },

  /**
   * Resets the title back to default and clear interval
   */
  resetTitle: function () {
    clearInterval(this.titleInterval);
    document.title = this.defaultTitle;
  }
});
