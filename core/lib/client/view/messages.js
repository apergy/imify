'use strict';

var Marionette = require('backbone.marionette'),
    entity = require('./../factory/entity');

module.exports = Marionette.CollectionView.extend({
  /**
   * @type {String}
   */
  className: 'messages',

  /**
   * @type {Marionette.ItemView}
   */
  childView: require('./../view/message'),

  /**
   * Starts the messages collection
   */
  initialize: function () {
    this.collection = entity.getMessages();
  }
});
