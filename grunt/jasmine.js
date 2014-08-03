'use strict';

module.exports = function () {
    return {
        src: 'dist/app_bundle.js',
        options: {
            specs: 'dist/test_bundle.js'
        }
    };
};
