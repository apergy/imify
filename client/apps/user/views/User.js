'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  /**
   * @type {String}
   */
  tagName: 'li',

  /**
   * @type {String}
   */
  className: 'user',

  /**
   * @type {Function}
   */
  template: require('./../templates/user.hbs')
});
