'use strict';

// Backbone needs to be given jQuery
var Backbone = require('backbone');
    Backbone.$ = require('jquery');

var Marionette = require('backbone.marionette'),
    MessageApp = require('./apps/message/MessageApp');

var App = new Marionette.Application();

App.addRegions({
  content: 'section',
  footer: 'footer'
});

App.addInitializer(function () {
  new MessageApp();
});

App.on('initialize:after', function () {
  Backbone.history.start();
});

module.exports = window.App = App;
