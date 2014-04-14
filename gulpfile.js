var gulp = require('gulp'),
    paths = require('./gulp/paths');

gulp.task('bower-clean', require('./gulp/bower-clean'));
gulp.task('bower-run', [ 'bower-clean' ], require('./gulp/bower-run'));
gulp.task('bower', [ 'bower-run' ]);

gulp.task('sass-clean', require('./gulp/sass-clean'));
gulp.task('sass-run', [ 'sass-clean' ], require('./gulp/sass-run'));
gulp.task('sass', [ 'sass-run' ]);

gulp.task('js-clean', [ 'bower' ], require('./gulp/js-clean'));
gulp.task('js-run', [ 'js-clean' ], require('./gulp/js-run'));
gulp.task('js', [ 'js-run' ]);

gulp.task('watch', require('./gulp/watch'));
gulp.task('default', [ 'bower', 'sass', 'js' ]);
