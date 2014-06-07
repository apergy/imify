'use strict';

var Backbone = require('backbone'),
    Message = require('./../view/message'),
    entity = require('./../factory/entity');

module.exports = Backbone.View.extend({
  /**
   * @type {String}
   */
  className: 'messages',

  /**
   * Starts the messages collection
   * @param  {Object} options
   */
  initialize: function (options) {
    this.collection = entity.getMessages();
    this.listenTo(this.collection, 'add', this.renderOne);
  },

  /**
   * Appends the rendered message
   * @param  {Backbone.Model} model
   * @return {Backbone.View}
   */
  renderOne: function (model) {
    var message = new Message({ model: model });
    this.$el.append(message.render().el);
    return this;
  },

  /**
   * Renders each of the messages
   * @return {Backbone.View}
   */
  render: function () {
    this.collection.each(this.renderOne, this);
    return this;
  }
});
