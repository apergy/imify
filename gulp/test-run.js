var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    paths = require('./paths');

// Backbone needs to be given jQuery
var Backbone = require('backbone');
    Backbone.$ = require('cheerio');

module.exports = function () {
  return gulp.src(paths.test)
    .pipe(jasmine());
};
