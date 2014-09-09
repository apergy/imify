'use strict';

// Backbone needs to be given jQuery
var Backbone = require('backbone');
    Backbone.$ = require('jquery');

var Marionette = require('backbone.marionette'),
    MessageApp = require('./apps/message/MessageApp'),
    UserApp = require('./apps/user/UserApp');

var App = new Marionette.Application();

App.addRegions({
  content: 'section',
  footer: 'footer'
});

App.addInitializer(function () {
  this.messageApp = new MessageApp();
  this.userApp = new UserApp();

  this.userApp.on('name:set', function () {
    App.footer.show(this.messageApp.newMessageView);
  }, this);

  App.content.show(this.messageApp.messagesView);
  App.footer.show(this.userApp.newUserView);
});

App.on('initialize:after', function () {
  Backbone.history.start();
  Backbone.$('input').focus();
});

module.exports = window.App = App;
