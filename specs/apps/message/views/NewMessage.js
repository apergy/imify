'use strict';

var $ = require('jquery'),
    Messages = require('./../../../../client/entities/Messages'),
    NewMessageView = require('./../../../../client/apps/message/views/NewMessage');

describe('View', function () {
  describe('NewMessage', function () {
    beforeEach(function () {
      this.messages = new Messages();
      spyOn(this.messages, 'sendMessage');

      this.newMessageView = new NewMessageView({ collection: this.messages });

      this.enterPress = $.Event('keypress');
      this.enterPress.which = this.enterPress.keyCode = 13;

      this.newMessageView.render();
    });

    describe('When rendered', function () {
      it('should ask for a message', function () {
        var actual = this.newMessageView.$('input').attr('placeholder');
        expect(actual).toBe('Enter a message...');
      });

      it('should notify a message entered', function () {
        this.newMessageView.$('input')
          .val('Hello World')
          .trigger(this.enterPress);

        expect(this.messages.sendMessage)
          .toHaveBeenCalledWith('Hello World');
      });
    });
  });
});
