'use strict';

// Backbone needs to be given jQuery
var Backbone = require('backbone');
    Backbone.$ = require('jquery');

var Marionette = require('backbone.marionette'),
    UserApp = require('./apps/user/UserApp'),
    MessageApp = require('./apps/message/MessageApp'),
    NotificationApp = require('./apps/notification/NotificationApp');

var App = new Marionette.Application();

App.addRegions({
  sidebar: 'aside',
  content: 'section',
  footer: 'footer'
});

App.addInitializer(function () {
  this.userApp = new UserApp();
  this.messageApp = new MessageApp();
  this.notificationApp = new NotificationApp();

  this.userApp.on('user:current:set', function () {
    App.footer.show(this.messageApp.newMessageView);
  }, this);

  App.sidebar.show(this.userApp.usersView);
  App.content.show(this.messageApp.messagesView);
  App.footer.show(this.userApp.newUserView);
});

App.on('initialize:after', function () {
  Backbone.history.start();
  Backbone.$('input').focus();
});

module.exports = window.App = App;
