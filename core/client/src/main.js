'use strict';

require([
  'angular',
  'app',
  'controller/chat',
  'shared/service/socket',
  'shared/directive/ngEnter'
], function (angular) {
  angular.bootstrap(document, [ 'imifyApp' ]);
});
