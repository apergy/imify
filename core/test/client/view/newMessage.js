'use strict';

var $ = require('jquery'),
    Backbone = require('backbone'),
    NewMessageView = require('../../../lib/client/view/newMessage');

describe('View', function () {
  describe('NewMessage', function () {
    beforeEach(function () {
      this.fakeSocket = jasmine.createSpyObj('socket', [ 'emit' ]);
      this.fakeMessages = new Backbone.Collection();
      this.fakeCurrentUser = new Backbone.Model();

      this.newMessage = new NewMessageView({
        socket: this.fakeSocket,
        collection: this.fakeMessages,
        currentUser: this.fakeCurrentUser
      });

      this.newMessage.render();

      this.enterPress = $.Event('keypress');
      this.enterPress.which = this.enterPress.keyCode = 13;
    });

    describe('When rendered without a user', function () {
      it('should ask for their name', function () {
        var actual = this.newMessage.$('input').attr('placeholder');
        expect(actual).toBe('Whats your name?');
      });

      it('should set the user name entered', function () {
        this.newMessage.$('input')
          .val('Joe Bloggs')
          .trigger(this.enterPress);
        expect(this.fakeCurrentUser.get('name')).toBe('Joe Bloggs');
      });

      it('should show new message after name entered', function () {
        this.newMessage.$('input')
          .val('Joe Bloggs')
          .trigger(this.enterPress);
        var actual = this.newMessage.$('input').attr('placeholder');
        expect(actual).toBe('Enter a message...');
      });
    });

    describe('When rendered with a user', function () {
      beforeEach(function () {
        this.fakeCurrentUser.set('name', 'Joe Bloggs');
        this.newMessage.render();
      });

      it('should ask for a message', function () {
        var actual = this.newMessage.$('input').attr('placeholder');
        expect(actual).toBe('Enter a message...');
      });

      it('should add the message entered', function () {
        this.newMessage.$('input')
          .val('Hello World')
          .trigger(this.enterPress);
        var actualMessage = this.fakeMessages.at(0);
        expect(actualMessage).toBeDefined();
        expect(actualMessage.get('type')).toBe('to');
        expect(actualMessage.get('user')).toBe(this.fakeCurrentUser);
        expect(actualMessage.get('message')).toBe('Hello World');
      });

      it('should emit entered message to socket', function () {
        this.newMessage.$('input')
          .val('Hello World')
          .trigger(this.enterPress);
        expect(this.fakeSocket.emit).toHaveBeenCalledWith('send:message', {
          type: 'from',
          user: { name: 'Joe Bloggs' },
          message: 'Hello World'
        });
      });
    });
  });
});
