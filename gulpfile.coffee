gulp = require 'gulp'
gutil = require 'gulp-util'
clean = require 'gulp-clean'
bower = require 'gulp-bower'
sass = require 'gulp-sass'

gulp.task 'bower', () ->
  bower()
    .pipe gulp.dest('dist/component')

gulp.task 'sass', () ->
  gulp.src 'dist/css', read: false
    .pipe clean()

  gulp.src 'core/assets/scss/**/*.scss'
    .pipe sass( outputStyle: 'compressed' )
    .pipe gulp.dest('dist/css')

gulp.task 'default', [ 'bower', 'sass' ]
