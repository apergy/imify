'use strict';

module.exports = function () {
  return {
    dist: {
      files: {
        './public/css/main.css': './core/assets/scss/main.scss'
      }
    }
  };
};
