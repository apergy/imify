'use strict';

module.exports = function () {
  return {
    all: [
      './Gruntfile.js',
      './app.js',
      './grunt/**/*.js',
      './client/script/**/*.js',
      './spec/**/*.js'
    ],
    options: { jshintrc: './.jshintrc' }
  };
};
