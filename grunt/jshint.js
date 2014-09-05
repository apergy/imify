'use strict';

module.exports = function () {
  return {
    all: [
      './Gruntfile.js',
      './app.js',
      './grunt/**/*.js',
      './client/scripts/**/*.js',
      './specs/**/*.js'
    ],
    options: { jshintrc: './.jshintrc' }
  };
};
