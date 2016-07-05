'use strict';

angular.module('kidCallowayApp')
  .controller('HeroCtrl', function ($scope, SettingsService) {
    $scope.message = 'Hello';
    $scope.heroOptions = {
      videoURL: undefined,
      animateLoader: true
    };

    // Get the YT url for the header
    SettingsService.get("heroVideo").then(function(setting) {debugger;
      $scope.heroOptions.videoURL = setting.value;
      $scope.heroOptions.animateLoader = false;
    });
  });
