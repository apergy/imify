'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    paths = require('./paths');

module.exports = function () {
  return gulp.src(paths.js.lib)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
};
