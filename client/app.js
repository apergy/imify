'use strict';

// Backbone needs to be given jQuery
var Backbone = require('backbone');
    Backbone.$ = require('jquery');

var Marionette = require('backbone.marionette'),
    HeaderApp = require('./apps/header/HeaderApp'),
    UserApp = require('./apps/user/UserApp'),
    MessageApp = require('./apps/message/MessageApp'),
    NotificationApp = require('./apps/notification/NotificationApp');

var App = new Marionette.Application();

App.addRegions({
  header: 'header',
  sidebar: 'aside',
  content: 'section',
  footer: 'footer'
});

App.addInitializer(function () {
  this.headerApp = new HeaderApp();
  this.userApp = new UserApp();
  this.messageApp = new MessageApp();
  this.notificationApp = new NotificationApp();

  this.userApp.on('user:current:set', function () {
    App.footer.show(this.messageApp.newMessageView);
  }, this);

  App.header.show(this.headerApp.headerView);
  App.sidebar.show(this.userApp.usersView);
  App.content.show(this.messageApp.messagesView);
  App.footer.show(this.userApp.newUserView);
});

App.on('initialize:after', function () {
  Backbone.history.start();
  Backbone.$('input').focus();
});

module.exports = window.App = App;
