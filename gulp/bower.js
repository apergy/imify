var gulp = require('gulp'),
    bower = require('gulp-bower'),
    paths = require('./paths');

module.exports = function () {
  return bower()
    .pipe(gulp.dest(paths.dist.component));
};
