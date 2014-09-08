'use strict';

var _ = require('underscore'),
    Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  toJSON: function () {
    var message = Backbone.Model.prototype.toJSON.call(this);
    return _.extend({}, message, {
      user: message.user.toJSON(),
      isSystem: message.type === 'system'
    });
  }
});
