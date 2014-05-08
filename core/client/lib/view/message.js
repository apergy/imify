'use strict';

var Backbone = require('backbone'),
    entity = require('./../factory/entity');

module.exports = Backbone.View.extend({
  /**
   * @type {String}
   */
  className: 'message',

  /**
   * @type {String}
   */
  template: require('./../template/message.hbs'),

  /**
   * Gets the current user
   * @param  {Object} options
   */
  initialize: function (options) {
    this.currentUser = entity.getCurrentUser();
  },

  /**
   * Returns if the message is from system
   * @return {Boolean}
   */
  isSystem: function () {
    return this.model.get('type') === 'system';
  },

  /**
   * Returns the name of the messages user
   * @return {String}
   */
  name: function () {
    return this.model.get('user').get('name');
  },

  /**
   * Returns the message
   * @return {String}
   */
  message: function () {
    return this.model.get('message');
  },

  /**
   * Renders the template with model
   * @return {Backbone.Model}
   */
  render: function () {
    this.$el.addClass(this.model.get('type'));
    this.$el.html(this.template(this));
    return this;
  }
});
