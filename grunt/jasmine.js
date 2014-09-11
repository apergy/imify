'use strict';

module.exports = function () {
  return {
    src: './build/app_bundle.js',
    options: {
      keepRunner: process.env.GRUNT_ENV === 'development',
      specs: './build/test_bundle.js',
      vendor: './public/js/vendor.js'
    }
  };
};
