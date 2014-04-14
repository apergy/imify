var gulp = require('gulp'),
    paths = require('./paths');

module.exports = function () {
  gulp.watch(paths.main.bower, [ 'bower' ]);
  gulp.watch(paths.sass, [ 'sass' ]);
  gulp.watch(paths.js, [ 'js' ]);
};
