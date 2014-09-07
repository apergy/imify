'use strict';

var $ = require('jquery'),
    Marionette = require('backbone.marionette');

module.exports = Marionette.CollectionView.extend({
  /**
   * @type {String}
   */
  className: 'messages',

  /**
   * @type {Marionette.ItemView}
   */
  childView: require('../view/Message'),

  /**
   * Scrolls the page to the latest message
   */
  onAddChild: function () {
    $('html, body').animate({
      scrollTop: $(document).height()
    });
  },
});
