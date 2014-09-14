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
  template: require('./../templates/message.hbs'),

  /**
   * Adds the type as a class and pulls message
   * upwards if from same previous user
   */
  onRender: function () {
    this.$el.addClass(this.model.getType());
    this.$el.toggleClass('pull-up', this.model.samePreviousUser());
  }
});
