'use strict';

var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
    jasmine = require('gulp-jasmine'),
    paths = require('./paths');

// Backbone needs to be given jQuery
var Backbone = require('backbone');
    Backbone.$ = require('cheerio');

module.exports = function () {
  return gulp.src(paths.js.test)
  	.pipe(browserify({
      insertGlobals: true,
      transform: [ 'hbsfy' ]
    }))
    .pipe(jasmine());
};
