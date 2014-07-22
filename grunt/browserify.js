'use strict';

module.exports = function (grunt) {

    var expandFiles = function (glob) {
        return grunt.file.expand({ filter: 'isFile' }, glob);
    };

    return {
        options: {
            transform: [ 'hbsfy' ]
        },
        main: {
            src: [ './core/lib/client/main.js' ],
            dest: './dist/js/main.js'
        },
        src: {
            src: [ './core/lib/client/**/*.js' ],
            dest: './dist/app_bundle.js',
            options: {
                require: expandFiles( [ './core/lib/client/**/*.js' ])
            }
        },
        test: {
            src: [ './core/test/client/**/*.js' ],
            dest: './dist/test_bundle.js',
            options: {
                external: [ './core/lib/client/**/*.js' ]
            }
        }
    };
};
