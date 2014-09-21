'use strict';

var Marionette = require('backbone.marionette'),
    HeaderView = require('./views/Header');

module.exports = Marionette.Controller.extend({
  /**
   * Shows the header view
   */
  initialize: function () {
    this.headerView = this.getHeaderView();
  },

  /**
   * Returns a header view
   * @return {Marionette.ItemView}
   */
  getHeaderView: function () {
    return new HeaderView();
  }
});
