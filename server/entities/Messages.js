'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  /**
   * @type {Backbone.Model}
   */
  model: require('./Message')
});
