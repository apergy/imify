'use strict';

var Marionette = require('backbone.marionette'),
    $ = require('jquery');

module.exports = Marionette.ItemView.extend({
  /**
   * @type {String}
   */
  className: 'header',

  /**
   * @type {Object}
   */
  events: {
    'click a': 'openSidebar'
  },

  /**
   * @type {Function}
   */
  template: require('./../templates/header.hbs'),

  /**
   * Opens and closes the sidebar
   * @param  {Object} event
   */
  openSidebar: function (event) {
    event.preventDefault();
    $('body').toggleClass('sidebar-open');
  }
});
