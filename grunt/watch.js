'use strict';

module.exports = function () {
  return {
    scripts: {
      files: [ './core/lib/client/**/*.js' ],
      tasks: [ 'browserify' ],
      options: { spawn: false }
    },
    styles: {
      files: [ './core/assets/scss/**/*.scss' ],
      tasks: [ 'sass' ],
      options: { spawn: false }
    }
  };
};
