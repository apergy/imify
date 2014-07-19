'use strict';

module.exports = {
  sass: './core/assets/scss/**/*.scss',
  js: './core/lib/client/**/*.js',
  test: './core/test/client/**/*.js',
  main: {
    sass: './core/assets/scss/main.scss',
    js: './core/lib/client/app.js'
  },
  dist: {
    main: './dist',
    css: './dist/css',
    js: './dist/js',
    app: './dist/js/app.js'
  }
};
