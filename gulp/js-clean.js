'use strict';

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    paths = require('./paths');

module.exports = function () {
  return gulp.src(paths.dist.app, { read: false })
    .pipe(clean());
};
