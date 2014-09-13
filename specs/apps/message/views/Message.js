'use strict';

var User = require('./../../../../client/entities/User'),
    Messages = require('./../../../../client/entities/Messages'),
    MessageView = require('./../../../../client/apps/message/views/Message');

describe('View', function () {
  describe('Message', function () {
    beforeEach(function () {
      this.messages = new Messages([ {
        type: 'from',
        user: new User({ name: 'Joe Bloggs' }),
        message: 'Hello World',
        datetime: '2014-09-12T23:20:37.993Z'
      } ]);

      this.message = this.messages.at(0);
      this.messageView = new MessageView({ model: this.message });
      this.messageView.render();
    });

    describe('When from someone', function () {
      it('should have class "from"', function () {
        expect(this.messageView.$el.hasClass('from')).toBeTruthy();
      });

      it('should have users name in a <small> tag', function () {
        var actual = this.messageView.$('small').text();
        expect(actual).toBe('Joe Bloggs');
      });

      it('should have the message in a <p> tag', function () {
        var actual = this.messageView.$('p').text();
        expect(actual).toBe('Hello World');
      });

      it('should have the formatted time in a <time> tag', function () {
        var actual = this.messageView.$('time').text();
        expect(actual).toBe('Sent at ' + this.message.getFormattedTime());
      });
    });

    describe('When to someone', function () {
      beforeEach(function () {
        this.message.set('type', 'to');
        this.messageView.render();
      });

      it('should have class "to"', function () {
        expect(this.messageView.$el.hasClass('to')).toBeTruthy();
      });

      it('should have users name in a <small> tag', function () {
        var actual = this.messageView.$('small').text();
        expect(actual).toBe('Joe Bloggs');
      });

      it('should have the message in a <p> tag', function () {
        var actual = this.messageView.$('p').text();
        expect(actual).toBe('Hello World');
      });

      it('should have the formatted time in a <time> tag', function () {
        var actual = this.messageView.$('time').text();
        expect(actual).toBe('Sent at ' + this.message.getFormattedTime());
      });
    });

    describe('When from same person as before', function () {
      beforeEach(function () {
        spyOn(this.message, 'samePreviousUser').and.returnValue(true);
        this.messageView.render();
      });

      it('should have class "pull-up"', function () {
        expect(this.messageView.$el.hasClass('pull-up')).toBeTruthy();
      });
    });
  });
});
