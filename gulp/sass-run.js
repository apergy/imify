var gulp = require('gulp'),
    sass = require('gulp-sass'),
    paths = require('./paths');

module.exports = function () {
  return gulp.src(paths.main.sass)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(paths.dist.css))
};
