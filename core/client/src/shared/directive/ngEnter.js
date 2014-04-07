'use strict';

define(function (require) {
  var app = require('app');

  return app.directive('ngEnter', function () {
    return function ($scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if (event.which === 13) {
          event.preventDefault();
          $scope.$apply(function () {
            $scope.$eval(attrs.ngEnter);
          });
        }
      });
    };
  });
});
