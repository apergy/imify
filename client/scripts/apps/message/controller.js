'use strict';

var Marionette = require('backbone.marionette'),
    entity = require('./../../factory/entity'),
    service = require('./../../factory/service'),
    MessagesView = require('./../../view/Messages'),
    NewMessageView = require('./../../view/NewMessage');

module.exports = Marionette.Controller.extend({
  /**
   * Shows the messages and new message view
   */
  initialize: function () {
    this.socket = service.getSocket();
    this.user = entity.getCurrentUser();
    this.messages = entity.getMessages();

    this.messagesView = this.getMessagesView(this.messages);
    this.newMessageView = this.getNewMessageView(this.messages);
    this.newMessageView.on('name:set', this.emitUser, this);
    this.newMessageView.on('message:add', this.emitMessage, this);

    window.App.content.show(this.messagesView);
    window.App.footer.show(this.newMessageView);
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
    return new NewMessageView({ collection: messages, user: this.user });
  },

  /**
   * Sends message to the other users
   * @param  {String} message
   */
  emitMessage: function (message) {
    this.socket.emit('send:message', {
      type: 'from',
      message: message,
      user: this.user.toJSON()
    });
  },

  /**
   * Tells other users the user has joined
   * @param  {Object} user
   */
  emitUser: function (user) {
    this.socket.emit('user:join', { user: user.toJSON() });
  }
});
