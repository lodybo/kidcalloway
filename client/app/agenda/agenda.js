'use strict';

angular.module('kidCallowayApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/agenda', {
        templateUrl: 'app/agenda/agenda.html',
        controller: 'AgendaCtrl'
      });
  });
