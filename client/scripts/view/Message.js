'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  /**
   * @type {String}
   */
  className: 'message',

  /**
   * @type {String}
   */
  template: require('../template/message.hbs'),

  /**
   * Gets the current user
   */
  initialize: function () {
    this.$el.addClass(this.model.get('type'));
  }
});
