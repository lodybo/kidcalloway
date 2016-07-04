'use strict';

angular.module('kidCallowayApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/site-settings', {
        templateUrl: 'app/_routes/site-settings/site-settings.html',
        controller: 'SiteSettingsCtrl'
      });
  });
