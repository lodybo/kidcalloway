'use strict';

angular.module('kidCallowayApp')
  .controller('HeroCtrl', function ($scope, SettingsService) {
    $scope.message = 'Hello';
    $scope.heroOptions = {
      videoURL: undefined
    };

    // Get the YT url for the header
    SettingsService.get("heroVideo").then(function(setting) {
      $scope.heroOptions.videoURL = setting.value;
    });
  });
