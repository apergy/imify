'use strict';

var Messages = require('../../../lib/client/view/messages');

describe('View', function () {
  describe('Messages', function () {
    beforeEach(function () {
      this.messages = new Messages();
    });

    describe('#className', function () {
      it('should be the right one', function () {
        var actual = this.messages.className;
        expect(actual).toBe('messages');
      });
    });
  });
});
