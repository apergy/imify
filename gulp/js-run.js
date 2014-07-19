'use strict';

var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    paths = require('./paths');

module.exports = function () {
  return gulp.src(paths.main.js)
    .pipe(browserify({
      insertGlobals: true,
      transform: [ 'hbsfy' ]
    }))
    .pipe(uglify({
      outSourceMap: true
    }))
    .pipe(gulp.dest(paths.dist.js));
};
