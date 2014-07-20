'use strict';

module.exports = {
  sass: './core/assets/scss/**/*.scss',
  js: {
    lib: './core/lib/**/*.js',
    test: './core/test/**/*.js'
  },
  main: {
    sass: './core/assets/scss/main.scss',
    js: './core/lib/client/main.js'
  },
  dist: {
    main: './dist',
    css: './dist/css',
    js: './dist/js',
    app: './dist/js/app.js'
  }
};
