'use strict';

// Backbone needs to be given jQuery
var Backbone = require('backbone');
    Backbone.$ = require('jquery');

var Messages = require('./view/Messages'),
    messages = new Messages();

var NewMessage = require('./view/NewMessage'),
    newMessage = new NewMessage();

var section = document.getElementsByTagName('section')[0];
section.appendChild(messages.render().el);

var footer = document.getElementsByTagName('footer')[0];
footer.appendChild(newMessage.render().el);
