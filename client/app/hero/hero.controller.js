'use strict';

angular.module('kidCallowayApp')
  .controller('HeroCtrl', function ($scope, SettingsService) {
    $scope.message = 'Hello';
    $scope.heroOptions = {
      videoURL: undefined
    };
    $scope.loaderScope = {
      classes: "col-xs-1 col-sm-push-5 col-md-push-5",
      animate: true,
      visible: true
    };

    // Get the YT url for the header
    SettingsService.get("heroVideo").then(function(setting) {
      $scope.heroOptions.videoURL = setting.value;
      $scope.loaderScope.animate = false;
      $scope.loaderScope.visible = false;
    });
  });
