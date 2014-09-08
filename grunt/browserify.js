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
      src: [ './client/app.js' ],
      dest: './public/js/app.js'
    },
    src: {
      src: [ './client/**/*.js' ],
      dest: './build/app_bundle.js',
      options: {
        require: expandFiles( [ './client/**/*.js' ])
      }
    },
    test: {
      src: [ './specs/**/*.js' ],
      dest: './build/test_bundle.js',
      options: {
        external: [ './client/**/*.js' ]
      }
    }
  };
};
