var gulp = require('gulp'),
    paths = require('./gulp/paths');

gulp.task('bower', require('./gulp/bower'));
gulp.task('sass', require('./gulp/sass'));
gulp.task('copy', require('./gulp/copy'));
gulp.task('watch', require('./gulp/watch'));

gulp.task('default', [ 'bower', 'sass', 'copy' ]);
