'use strict';

var Backbone = require('backbone'),
    MessageView = require('./../../client/script/view/message');

describe('View', function () {
  describe('Message', function () {
    describe('When from someone', function () {
      beforeEach(function () {
        this.fakeMessage = new Backbone.Model({
          type: 'from',
          isSystem: false,
          user: { name: 'Joe Bloggs' },
          message: 'Hello World'
        });

        this.message = new MessageView({ model: this.fakeMessage });
        this.message.render();
      });

      it('should have class "from"', function () {
        expect(this.message.$el.hasClass('from')).toBeTruthy();
      });

      it('should have users name in a <small> tag', function () {
        var actual = this.message.$('small').text();
        expect(actual).toBe('Joe Bloggs');
      });

      it('should have the message in a <p> tag', function () {
        var actual = this.message.$('p').text();
        expect(actual).toBe('Hello World');
      });
    });

    describe('When to someone', function () {
      beforeEach(function () {
        this.fakeMessage = new Backbone.Model({
          type: 'to',
          isSystem: false,
          user: { name: 'Joe Bloggs' },
          message: 'Hello World'
        });

        this.message = new MessageView({ model: this.fakeMessage });
        this.message.render();
      });

      it('should have class "to"', function () {
        expect(this.message.$el.hasClass('to')).toBeTruthy();
      });

      it('should have users name in a <small> tag', function () {
        var actual = this.message.$('small').text();
        expect(actual).toBe('Joe Bloggs');
      });

      it('should have the message in a <p> tag', function () {
        var actual = this.message.$('p').text();
        expect(actual).toBe('Hello World');
      });
    });

    describe('When from the system', function () {
      beforeEach(function () {
        this.fakeMessage = new Backbone.Model({
          type: 'system',
          isSystem: true,
          user: { name: 'Joe Bloggs' }
        });

        this.message = new MessageView({ model: this.fakeMessage });
        this.message.render();
      });

      it('should have class "system"', function () {
        expect(this.message.$el.hasClass('system')).toBeTruthy();
      });

      it('should say the user has joined in a <small> tag', function () {
        var actual = this.message.$('small').text();
        expect(actual).toBe('Joe Bloggs has joined.');
      });

      it('should NOT have a message in a <p> tag', function () {
        expect(this.message.$('p').length).toBe(0);
      });
    });
  });
});
