'use strict';

var Backbone = require('backbone'),
    Message = require('../../../lib/client/view/message');

describe('View', function () {
  describe('Message', function () {
    beforeEach(function () {
      this.fakeMessage = new Backbone.Model({ type: 'type' });
      this.message = new Message({ model: this.fakeMessage });
    });

    describe('#className', function () {
      it('should be the right one', function () {
        var actual = this.message.className;
        expect(actual).toBe('message');
      });
    });
  });
});
