'use strict';

var Message = require('../../lib/view/Message');

describe('View', function () {
  describe('Message', function () {
    beforeEach(function () {
      this.message = new Message();
    });

    describe('#className', function () {
      it('should be the right one', function () {
        var actual = this.message.className;
        expect(actual).toBe('message-list');
      });
    });
  });
});
