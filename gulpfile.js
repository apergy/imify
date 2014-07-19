var gulp = require('gulp');

gulp.task('sass-clean', require('./gulp/sass-clean'));
gulp.task('sass-run', [ 'sass-clean' ], require('./gulp/sass-run'));
gulp.task('sass', [ 'sass-run' ]);

gulp.task('jshint-lib', require('./gulp/jshint-lib'));
gulp.task('jshint-test', require('./gulp/jshint-test'));
gulp.task('jshint', [ 'jshint-lib', 'jshint-test' ]);

gulp.task('js-clean', require('./gulp/js-clean'));
gulp.task('js-run', [ 'js-clean' ], require('./gulp/js-run'));
gulp.task('js', [ 'js-run' ]);

gulp.task('test', require('./gulp/test-run'));

gulp.task('watch', require('./gulp/watch'));
gulp.task('default', [ 'sass', 'jshint', 'js' ]);
