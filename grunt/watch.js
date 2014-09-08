'use strict';

module.exports = function () {
  return {
    styles: {
      files: [ './styles/**/*.scss' ],
      tasks: [ 'sass' ],
      options: { spawn: false }
    },
    scripts: {
      files: [ './client/**/*.js' ],
      tasks: [ 'browserify' ],
      options: { spawn: false }
    },
    specs: {
      files: [ './specs/**/*.js' ],
      tasks: [ 'browserify', 'jasmine' ],
      options: { spawn: false }
    }
  };
};
