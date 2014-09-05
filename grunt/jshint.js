'use strict';

module.exports = function () {
  return {
    all: [
      './Gruntfile.js',
      './app.js',
      './grunt/**/*.js',
      './core/**/*.js'
    ],
    options: { jshintrc: './.jshintrc' }
  };
};
