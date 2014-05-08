'use strict';

var NewMessage = require('../../lib/view/newMessage');

describe('View', function () {
  describe('NewMessage', function () {
    beforeEach(function () {
      this.newMessage = new NewMessage();
    });

    describe('#className', function () {
      it('should be the right one', function () {
        var actual = this.newMessage.className;
        expect(actual).toBe('new-message');
      });
    });
  });
});
