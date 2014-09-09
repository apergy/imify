'use strict';

var $ = require('jquery'),
    Backbone = require('backbone'),
    NewMessageView = require('./../../../../client/apps/message/views/NewMessage');

describe('View', function () {
  describe('NewMessage', function () {
    beforeEach(function () {
      this.fakeSocket = jasmine.createSpyObj('socket', [ 'emit' ]);
      this.fakeMessages = new Backbone.Collection();
      this.newMessage = new NewMessageView({ collection: this.fakeMessages });

      this.enterPress = $.Event('keypress');
      this.enterPress.which = this.enterPress.keyCode = 13;

      this.newMessage.render();
    });

    describe('When rendered', function () {
      beforeEach(function () {
        this.fakeListener = jasmine.createSpy('listener');
        this.newMessage.on('message:send', this.fakeListener);
      });

      it('should ask for a message', function () {
        var actual = this.newMessage.$('input').attr('placeholder');
        expect(actual).toBe('Enter a message...');
      });

      it('should notify a message entered', function () {
        this.newMessage.$('input')
          .val('Hello World')
          .trigger(this.enterPress);

        expect(this.fakeListener).toHaveBeenCalledWith('Hello World');
      });
    });
  });
});
