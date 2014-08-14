'use strict';

module.exports = function () {
  return {
    dist: {
      files: {
        './dist/css/main.css': './core/assets/scss/main.scss'
      }
    }
  };
};
