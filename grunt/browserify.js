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
      src: [ './core/lib/client/app.js' ],
      dest: './public/js/app.js'
    },
    src: {
      src: [ './core/lib/client/**/*.js' ],
      dest: './build/app_bundle.js',
      options: {
        require: expandFiles( [ './core/lib/client/**/*.js' ])
      }
    },
    test: {
      src: [ './core/test/client/**/*.js' ],
      dest: './build/test_bundle.js',
      options: {
        external: [ './core/lib/client/**/*.js' ]
      }
    }
  };
};
