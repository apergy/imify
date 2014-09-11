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
    app: {
      src: [ './client/app.js' ],
      dest: './public/js/app.js',
      options: {
        external: [
          'jquery',
          'underscore',
          'backbone',
          'backbone.marionette',
          'handlebars',
          'socket.io-client'
        ]
      }
    },
    vendor: {
      src: [ '.' ],
      dest: './public/js/vendor.js',
      options: {
        require: [
          'jquery',
          'underscore',
          'backbone',
          'backbone.marionette',
          'handlebars',
          'socket.io-client'
        ]
      }
    },
    src: {
      src: [ './client/**/*.js' ],
      dest: './build/app_bundle.js',
      options: {
        external: [
          'jquery',
          'underscore',
          'backbone',
          'backbone.marionette',
          'handlebars',
          'socket.io-client'
        ],
        require: expandFiles( [ './client/**/*.js' ])
      }
    },
    test: {
      src: [ './specs/**/*.js' ],
      dest: './build/test_bundle.js',
      options: {
        external: [
          'jquery',
          'underscore',
          'backbone',
          'backbone.marionette',
          'handlebars',
          'socket.io-client',
          './client/**/*.js'
        ]
      }
    }
  };
};
