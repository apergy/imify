'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.CompositeView.extend({
  /**
   * @type {String}
   */
  className: 'users',

  /**
   * @type {Function}
   */
  template: require('./../templates/users.hbs'),

  /**
   * @type {Marionette.ItemView}
   */
  childView: require('./User.js'),

  /**
   * @type {String}
   */
  childViewContainer: 'ul'
});
