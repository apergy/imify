var gulp = require('gulp'),
    paths = require('./paths');

module.exports = function () {
  return gulp.src(paths.js)
    .pipe(gulp.dest(paths.dist.js));
};
