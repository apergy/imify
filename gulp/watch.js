var gulp = require('gulp'),
    paths = require('./paths');

module.exports = function () {
  gulp.watch(paths.bower, [ 'default' ]);
  gulp.watch(paths.sass, [ 'default' ]);
  gulp.watch(paths.js, [ 'default' ]);
};
