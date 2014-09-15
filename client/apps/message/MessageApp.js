'use strict';

var Marionette = require('backbone.marionette'),
    entity = require('./../../factory/entity'),
    service = require('./../../factory/service'),
    MessagesView = require('./views/Messages'),
    NewMessageView = require('./views/NewMessage');

module.exports = Marionette.Controller.extend({
  /**
   * Shows the messages and new message view
   */
  initialize: function () {
    this.user = entity.getCurrentUser();
    this.socket = service.getSocket();

    this.messages = entity.getMessages();
    this.messages.fetch();

    this.messagesView = this.getMessagesView(this.messages);
    this.newMessageView = this.getNewMessageView(this.messages);
    this.newMessageView.on('typing:started', this.typingStarted, this);
    this.newMessageView.on('typing:stopped', this.typingStopped, this);
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
   * Notifies app the user has started typing
   */
  typingStarted: function () {
    this.socket.emit('typing:started', this.user.toJSON());
  },

  /**
   * Notifies app the user has stopped typing
   */
  typingStopped: function () {
    this.socket.emit('typing:stopped', this.user.toJSON());
  }
});
