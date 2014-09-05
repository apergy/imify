'use strict';

module.exports = function (grunt) {

  var expandFiles = function (glob) {
    return grunt.file.expand({ filter: 'isFile' }, glob);
  };

  return {
    options: {
      transform: [ 'hbsfy' ],
      browserifyOptions: { debug: process.env.GRUNT_ENV === 'development' }
    },
    main: {
      src: [ './client/script/app.js' ],
      dest: './public/js/app.js'
    },
    src: {
      src: [ './client/script/**/*.js' ],
      dest: './build/app_bundle.js',
      options: {
        require: expandFiles( [ './client/script/**/*.js' ])
      }
    },
    test: {
      src: [ './spec/**/*.js' ],
      dest: './build/test_bundle.js',
      options: {
        external: [ './client/script/**/*.js' ]
      }
    }
  };
};
