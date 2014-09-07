'use strict';

// Backbone needs to be given jQuery
var $ = require('jquery'),
    Backbone = require('backbone');
    Backbone.$ = $;

var Marionette = require('backbone.marionette'),
    Messages = require('./view/Messages'),
    NewMessage = require('./view/NewMessage'),
    entity = require('./factory/entity'),
    service = require('./factory/service');

var socket = service.getSocket(),
    messages = entity.getMessages(),
    currentUser = entity.getCurrentUser(),
    App = new Marionette.Application();

var scrollToBottom = function () {
  $('html, body').animate({
    scrollTop: $(document).height()
  });
};

messages.on('add', scrollToBottom);
socket.on('send:message', scrollToBottom);

App.on('initialize:before', function (options) {
  App.environment = options.environment;
});

App.addRegions({
  content: 'section',
  footer: 'footer'
});

App.addInitializer(function () {
  App.content.show(new Messages({
    collection: messages
  }));

  App.footer.show(new NewMessage({
    socket: socket,
    collection: messages,
    currentUser: currentUser
  }));
});

App.on('initialize:after', function () {
  if (Backbone.history) {
    Backbone.history.start();
  }
});

module.exports = window.App = App;
