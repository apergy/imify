'use strict';

module.exports = function () {
  return {
    styles: {
      files: [ './styles/**/*.scss' ],
      tasks: [ 'sass' ]
    },
    scripts: {
      files: [ './client/**/*.js', './client/**/*.hbs' ],
      tasks: [ 'browserify' ]
    },
    specs: {
      files: [ './specs/**/*.js' ],
      tasks: [ 'browserify', 'jasmine' ]
    }
  };
};
