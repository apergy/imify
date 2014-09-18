'use strict';

var Marionette = require('backbone.marionette'),
    emojione = require('./../../../../node_modules/emojione/lib/js/emojione').emojione;

// Turns on :) emojis
emojione.ascii = true;

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
   * Replaces URL with <a> link to URL
   * @param  {String} string
   * @return {String}
   */
  toLink: function (string) {
    var urlRegex = /((http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?)/;
    return string.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
  },

  /**
   * Adds the type as a class and pulls message
   * upwards if from same previous user
   */
  onRender: function () {
    this.$el.addClass(this.model.getType());
    this.$el.toggleClass('pull-up', this.model.samePreviousUser());
    this.$('p').html(emojione.toImage(this.toLink(this.model.get('message'))));
  }
});
