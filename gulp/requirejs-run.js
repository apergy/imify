var gulp = require('gulp'),
    rjs = require('gulp-requirejs'),
    paths = require('./paths');

module.exports = function () {
  return rjs({
    baseUrl: 'core/client/src',
    name: '../../../cache/almond/almond',
    deps: [ 'main' ],
    insertRequire: [ 'main' ],
    paths: {
      angular: '../../../cache/angular/angular',
      io: '../../../cache/socket.io-client/dist/socket.io'
    },
    shim: {
      angular: { exports: 'angular' },
      io: { exports: 'io' }
    },
    out: 'app.min.js'
  }).pipe(gulp.dest(paths.dist.js));
};
