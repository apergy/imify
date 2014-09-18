'use strict';

var User = require('./../../../../client/entities/User'),
    Messages = require('./../../../../client/entities/Messages'),
    MessagesView = require('./../../../../client/apps/message/views/Messages');

describe('View', function () {
  describe('Messages', function () {
    beforeEach(function () {
      this.messages = new Messages();
      this.messagesView = new MessagesView({ collection: this.messages });
      this.messagesView.render();
    });

    describe('When no messages', function () {
      it('should be empty', function () {
        expect(this.messagesView.$el.children().length).toBe(0);
      });
    });

    describe('When one message and one added', function () {
      beforeEach(function () {
        this.messages.add({ user: new User(), message: '' });
      });

      it('should show one message', function () {
        expect(this.messagesView.$el.children().length).toBe(1);
      });

      it('should now show two messages', function () {
        this.messages.add({ user: new User(), message: '' });
        expect(this.messagesView.$el.children().length).toBe(2);
      });
    });

    describe('When two messages and one removed', function () {
      beforeEach(function () {
        this.messages.add({ user: new User(), message: '' });
        this.messages.add({ user: new User(), message: '' });
      });

      it('should show two messages', function () {
        expect(this.messagesView.$el.children().length).toBe(2);
      });

      it('should now show one message', function () {
        this.messages.remove([ this.messages.at(1) ]);
        expect(this.messagesView.$el.children().length).toBe(1);
      });
    });
  });
});
