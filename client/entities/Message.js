'use strict';

var _ = require('underscore'),
    Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  getFormattedTime: function () {
    var date = new Date(this.get('datetime'));
    return [ date.getHours(), date.getMinutes() ].join(':');
  },

  toJSON: function () {
    var message = Backbone.Model.prototype.toJSON.call(this);
    return _.extend({}, message, {
      user: message.user.toJSON(),
      isJoin: message.type === 'join',
      isLeave: message.type === 'leave',
      formattedTime: this.getFormattedTime()
    });
  }
});
