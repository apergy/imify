'use strict';

module.exports = {
  /**
   * @type {Object}
   */
  cache: {},

  /**
   * Returns an entity via cache or cache creation
   * @param  {String} key
   * @param  {Function} Entity
   * @return {Object}
   */
  get: function (key, Entity) {
    return this.cache[key] || (this.cache[key] = new Entity());
  },

  /**
   * Returns the current user
   * @return {Backbone.Model}
   */
  getCurrentUser: function () {
    return this.get('currentUser', require('./../entities/User'));
  },

  /**
   * Returns the users
   * @return {Backbone.Collection}
   */
  getUsers: function () {
    return this.get('users', require('./../entities/Users'));
  },

  /**
   * Returns the messages
   * @return {Backbone.Collection}
   */
  getMessages: function () {
    return this.get('messages', require('./../entities/Messages'));
  }
};
