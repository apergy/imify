'use strict';

// Backbone needs to be given jQuery
var $ = require('jquery'),
    Backbone = require('backbone');
    Backbone.$ = $;

var Marionette = require('backbone.marionette'),
    Messages = require('./view/messages'),
    NewMessage = require('./view/newMessage'),
    io = require('socket.io-client'),
    entity = require('./factory/entity');

var socket = io.connect('/' + window.location.pathname.split('/')[2]),
    messages = entity.getMessages(),
    currentUser = entity.getCurrentUser(),
    app = new Marionette.Application();


var scrollToBottom = function () {
  $('html, body').animate({
    scrollTop: $(document).height()
  });
};

messages.on('add', scrollToBottom);
socket.on('send:message', scrollToBottom);

app.on('initialize:before', function (options) {
  app.environment = options.environment;
});

app.addRegions({
  messages: 'section',
  newMessage: 'footer'
});

app.addInitializer(function () {
  app.messages.show(new Messages({
    collection: messages
  }));

  app.newMessage.show(new NewMessage({
    socket: socket,
    collection: messages,
    currentUser: currentUser
  }));
});

app.on('initialize:after', function () {
  if (Backbone.history) {
    Backbone.history.start();
  }
});

module.exports = window.app = app;
