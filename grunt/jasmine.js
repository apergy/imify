'use strict';

module.exports = function () {
  return {
    src: 'dist/app_bundle.js',
    options: {
      keepRunner: process.env.GRUNT_ENV === 'development',
      specs: 'dist/test_bundle.js'
    }
  };
};
