'use strict';

module.exports = function () {
  return {
    dist: {
      files: {
        './public/css/main.css': './client/style/main.scss'
      }
    }
  };
};
