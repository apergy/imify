'use strict';

// Backbone needs to be given jQuery
var Backbone = require('backbone');
    Backbone.$ = require('jquery');

var Marionette = require('backbone.marionette'),
    MessagesApp = require('./apps/message/controller');

var App = new Marionette.Application();

App.addRegions({
  content: 'section',
  footer: 'footer'
});

App.addInitializer(function () {
  new MessagesApp();
});

App.on('initialize:after', function () {
  Backbone.history.start();
});

module.exports = window.App = App;
