'use strict';

module.exports = function () {
	return {
		browserify: [ 'browserify:main', 'browserify:src', 'browserify:test' ]
	};
};
