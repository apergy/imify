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
  childView: require('./Message'),

  /**
   * Scrolls the container to the latest message
   */
  onAddChild: function () {
    this.$el.parent().animate({ scrollTop: this.$el.height() });
  },
});
