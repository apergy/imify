'use strict';

define(function (require) {
  var app = require('app');

  var NgEnter = function () {
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
  };

  return app.directive(
    'ngEnter',
    NgEnter
  );
});
