'use strict';

module.exports = function () {
  return {
    styles: {
      files: [ './client/style/**/*.scss' ],
      tasks: [ 'sass' ],
      options: { spawn: false }
    },
    scripts: {
      files: [ './client/script/**/*.js' ],
      tasks: [ 'browserify' ],
      options: { spawn: false }
    },
    specs: {
      files: [ './spec/**/*.js' ],
      tasks: [ 'jasmine' ],
      options: { spawn: false }
    }
  };
};
