'use strict';

var _ = require('underscore'),
    Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  /**
   * @type {String}
   */
  className: 'new-user',

  /**
   * @type {Function}
   */
  template: require('./../templates/newUser.hbs'),

  /**
   * @type {Object}
   */
  events: {
    'keypress input': 'setName'
  },

  /**
   * Triggers a user set name event
   * @param  {Object} event
   */
  setName: function (event) {
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();
      this.model.set('name', event.target.value);
      this.trigger('name:set', this.model);
    }
  },

  /**
   * Focuses user cursor on input
   */
  onRender: function () {
    _.defer(function (that) {
      that.$('input').focus();
    }, this);
  }
});
