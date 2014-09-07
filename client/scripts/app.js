'use strict';

// Backbone needs to be given jQuery
var Backbone = require('backbone');
    Backbone.$ = require('jquery');

var Marionette = require('backbone.marionette'),
    Messages = require('./view/Messages'),
    NewMessage = require('./view/NewMessage'),
    entity = require('./factory/entity'),
    service = require('./factory/service');

var socket = service.getSocket(),
    messages = entity.getMessages(),
    currentUser = entity.getCurrentUser(),
    App = new Marionette.Application();

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
  Backbone.history.start();
});

module.exports = window.App = App;
