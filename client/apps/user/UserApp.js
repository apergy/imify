'use strict';

var Marionette = require('backbone.marionette'),
    entity = require('./../../factory/entity'),
    service = require('./../../factory/service'),
    UsersView = require('./views/Users'),
    NewUserView = require('./views/NewUser'),
    _ = require('underscore');

module.exports = Marionette.Controller.extend({
  /**
   * Shows the new user view
   */
  initialize: function () {
    this.socket = service.getSocket();
    this.user = entity.getCurrentUser();

    this.users = entity.getUsers();
    this.users.fetch();

    this.usersView = this.getUsersView(this.users);
    this.newUserView = this.getNewUserView(this.user);
    this.newUserView.on('user:current:set', this.sendUser, this);

    window.addEventListener('focus', _.bind(this.userFocused, this));
    window.addEventListener('blur', _.bind(this.userBlured, this));
  },

  /**
   * Returns a users view
   * @param  {Backbone.Collection} users
   * @return {Marionette.CompositeView}
   */
  getUsersView: function (users) {
    return new UsersView({ collection: users });
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
    this.trigger('user:current:set', user);
    this.socket.emit('users:create', user.toJSON(), function (data) {
      user.set(data); // Updates the current user with an ID
    });
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
  }
});
