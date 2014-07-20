'use strict';

var $ = require('jquery'),
	app = require('./app');

$(function () {
	app.start({
		environment: process.env.environment || 'development'
	});
});

module.exports = window.app = app;
