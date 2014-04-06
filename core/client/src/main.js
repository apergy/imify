'use strict';

require.config({
  paths: {
    angular: '../component/angular/angular',
    io: '../component/socket.io-client/dist/socket.io'
  },
  shim: {
    angular: {
      exports: 'angular'
    }
  }
});

require([
  'angular',
  'app',
  'controller/chat',
  'shared/service/socket',
  'shared/directive/ng-enter'
], function (angular) {
  angular.bootstrap(document, [ 'imify-app' ]);
});
