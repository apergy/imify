'use strict';

var Backbone = require('backbone'),
    MessagesView = require('./../../client/scripts/view/messages');

describe('View', function () {
  describe('Messages', function () {
    describe('When no messages', function () {
      beforeEach(function () {
        this.fakeMessages = new Backbone.Collection();

        this.messages = new MessagesView({ collection: this.fakeMessages });
        this.messages.render();
      });

      it('should be empty', function () {
        expect(this.messages.$el.children().length).toBe(0);
      });
    });

    describe('When one message and one added', function () {
      beforeEach(function () {
        this.fakeMessages = new Backbone.Collection([ {} ]);
        this.messages = new MessagesView({ collection: this.fakeMessages });
        this.messages.render();
      });

      it('should show one message', function () {
        expect(this.messages.$el.children().length).toBe(1);
      });

      it('should now show two messages', function () {
        this.fakeMessages.add({});
        expect(this.messages.$el.children().length).toBe(2);
      });
    });

    describe('When two messages and one removed', function () {
      beforeEach(function () {
        this.fakeMessages = new Backbone.Collection([ {}, {} ]);
        this.messages = new MessagesView({ collection: this.fakeMessages });
        this.messages.render();
      });

      it('should show two messages', function () {
        expect(this.messages.$el.children().length).toBe(2);
      });

      it('should now show one message', function () {
        var model = this.fakeMessages.at(1);
        this.fakeMessages.remove([ model ]);
        expect(this.messages.$el.children().length).toBe(1);
      });
    });
  });
});
