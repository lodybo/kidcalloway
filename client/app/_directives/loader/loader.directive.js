'use strict';

angular.module('kidCallowayApp')
  .directive('loader', function () {
    return {
      templateUrl: 'app/_directives/loader/loader.html',
      restrict: 'E',
      scope: {
        loader: "=loaderScope"
      }
    };
  });