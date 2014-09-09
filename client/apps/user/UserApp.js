'use strict';

var Marionette = require('backbone.marionette'),
    entity = require('./../../factory/entity'),
    service = require('./../../factory/service'),
    NewUserView = require('./views/NewUser');

module.exports = Marionette.Controller.extend({
  /**
   * Shows the new user view
   */
  initialize: function () {
    this.socket = service.getSocket();
    this.user = entity.getCurrentUser();

    this.newUserView = this.getNewUserView(this.user);
    this.newUserView.on('name:set', this.sendUser, this);
  },

  /**
   * Returns a new user view
   * @param  {Backbone.Model} user
   * @return {Marionette.ItemView}
   */
  getNewUserView: function (user) {
    return new NewUserView({ model: user });
  },

  /**
   * Sends user to the other users
   * @param  {Backbone.Model} user
   */
  sendUser: function (user) {
    this.trigger('name:set', user);
    this.socket.emit('user:join', { user: user.toJSON() });
  }
});
