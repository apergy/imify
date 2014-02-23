gulp = require 'gulp'
gutil = require 'gulp-util'
clean = require 'gulp-clean'
bower = require 'gulp-bower'
sass = require 'gulp-sass'
coffee = require 'gulp-coffee'

gulp.task 'bower', () ->
  bower()
    .pipe gulp.dest('dist/component')

gulp.task 'sass', () ->
  gulp.src 'dist/css', read: false
    .pipe clean()

  gulp.src 'core/assets/scss/**/*.scss'
    .pipe sass( outputStyle: 'compressed' )
    .pipe gulp.dest('dist/css')

gulp.task 'coffee', () ->
  gulp.src 'core/client/src/**/*.coffee'
    .pipe coffee()
    .pipe gulp.dest('dist/js')

gulp.task 'default', [ 'bower', 'sass', 'coffee' ]
