'use strict';

// Backbone needs to be given jQuery
var Backbone = require('backbone');
    Backbone.$ = require('jquery');

var Marionette = require('backbone.marionette'),
    Messages = require('./view/messages'),
    NewMessage = require('./view/newMessage'),
    app = new Marionette.Application(),
    messages = new Messages(),
    newMessage = new NewMessage();

app.on('initialize:before', function (options) {
    app.environment = options.environment;
});

app.addRegions({
    messages: 'section',
    newMessage: 'footer'
});

app.addInitializer(function () {
    app.messages.show(messages);
    app.newMessage.show(newMessage);
});

app.on('initialize:after', function () {
    if (Backbone.history) {
        Backbone.history.start();
    }
});

module.exports = app;
