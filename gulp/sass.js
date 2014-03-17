var gulp = require('gulp'),
    sass = require('gulp-sass'),
    paths = require('./paths');

module.exports = function () {
  return gulp.src(paths.sass)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(paths.dist.css))
};
