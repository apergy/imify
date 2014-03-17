var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    paths = require('./paths');

module.exports = function () {
  gulp.src('dist/css', { read: false })
    .pipe(clean());

  gulp.src(paths.sass)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(paths.dist.css))
};
