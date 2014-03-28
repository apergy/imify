var gulp = require('gulp'),
    paths = require('./gulp/paths');

gulp.task('clean', require('./gulp/clean'));
gulp.task('bower', [ 'clean' ], require('./gulp/bower'));
gulp.task('sass', [ 'clean' ], require('./gulp/sass'));
gulp.task('js', [ 'clean' ], require('./gulp/js'));
gulp.task('watch', require('./gulp/watch'));

gulp.task('default', [ 'clean', 'bower', 'sass', 'js' ]);
