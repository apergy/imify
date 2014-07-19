'use strict';

module.exports = {
  sass: './core/assets/scss/**/*.scss',
  js: './core/client/lib/**/*.js',
  test: './core/client/test/**/*.js',
  main: {
    sass: './core/assets/scss/main.scss',
    js: './core/client/lib/app.js'
  },
  dist: {
    main: './dist',
    css: './dist/css',
    js: './dist/js',
    app: './dist/js/app.js'
  }
};
