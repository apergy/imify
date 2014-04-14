module.exports = {
  sass: './core/assets/scss/**/*.scss',
  js: './core/client/src/**/*.js',
  main: {
    bower: [ './.bowerrc', './bower.json', './cache/*' ],
    sass: './core/assets/scss/main.scss'
  },
  dist: {
    main: './dist',
    component: './dist/component',
    css: './dist/css',
    js: './dist/js',
    app: './dist/js/app.js'
  }
};
