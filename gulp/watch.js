var gulp = require('gulp'),
    paths = require('./paths');

module.exports = function () {
  gulp.watch(paths.bower, [ 'bower' ]);
  gulp.watch(paths.sass, [ 'sass' ]);
  gulp.watch(paths.coffee, [ 'coffee' ]);
};
