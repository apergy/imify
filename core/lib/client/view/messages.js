'use strict';

var Marionette = require('backbone.marionette');

module.exports = Marionette.CollectionView.extend({
  /**
   * @type {String}
   */
  className: 'messages',

  /**
   * @type {Marionette.ItemView}
   */
  childView: require('./../view/message')
});
