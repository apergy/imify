var gulp = require('gulp'),
    clean = require('gulp-clean'),
    paths = require('./paths');

module.exports = function () {
  return gulp.src(paths.dist.main, { read: false })
    .pipe(clean());
};
