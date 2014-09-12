'use strict';

var _ = require('underscore'),
    Marionette = require('backbone.marionette'),
    entity = require('./../../factory/entity'),
    service = require('./../../factory/service'),
    User = require('./../../entities/User'),
    MessagesView = require('./views/Messages'),
    NewMessageView = require('./views/NewMessage');

module.exports = Marionette.Controller.extend({
  /**
   * Shows the messages and new message view
   */
  initialize: function () {
    this.user = entity.getCurrentUser();
    this.messages = entity.getMessages();

    this.socket = service.getSocket();
    this.socket.on('message:send', _.bind(this.recieveMessage, this));

    this.messagesView = this.getMessagesView(this.messages);
    this.newMessageView = this.getNewMessageView(this.messages);
    this.newMessageView.on('message:send', this.sendMessage, this);
  },

  /**
   * Returns a messages view
   * @param  {Backbone.Collection} messages
   * @return {Marionette.CollectionView}
   */
  getMessagesView: function (messages) {
    return new MessagesView({ collection: messages });
  },

  /**
   * Returns a new message view
   * @param  {Backbone.Collection} messages
   * @return {Marionette.ItemView}
   */
  getNewMessageView: function (messages) {
    return new NewMessageView({ collection: messages });
  },

  /**
   * Sends message to the other users
   * @param  {String} message
   */
  sendMessage: function (message) {
    this.messages.add({
      type: 'to',
      message: message,
      user: this.user,
      datetime: JSON.parse(JSON.stringify(new Date()))
    });

    this.socket.emit('message:send', {
      message: message,
      user: this.user.toJSON()
    });
  },

  /**
   * Adds a new message recieved from socket
   * @param {Object} data
   */
  recieveMessage: function (data) {
    this.messages.add({
      type: 'from',
      user: new User(data.user),
      message: data.message,
      datetime: JSON.parse(JSON.stringify(new Date()))
    });
  }
});
