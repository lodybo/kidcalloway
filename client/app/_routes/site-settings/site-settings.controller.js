'use strict';

angular.module('kidCallowayApp')
  .controller('SiteSettingsCtrl', function ($scope, SettingsService) {
    // Models
    $scope.settingsForm = {};
    $scope.errors = {
      show: false,
      message: ""
    };

    // First get all the settings from the server
    SettingsService.get().then(function(success) {
      // Pass all the settings onto the model
      for (var i=0; i<success.length; i++) {
        var setting = success[i];
        $scope.settingsForm[setting.name] = setting.value;
      }
    }, function (error) {
      // Handle Error
      $scope.errors.show = true;
      $scope.errors.message = "Er is iets fout gegaan met het ophalen van de settings.";

      // Output server error to console
      console.error("Fout bij het ophalen van de settings:", error);
    });

    // Submit the settings from the form
    $scope.submitSettings = function (setting) {
      SettingsService.update(setting, $scope.settingsForm[setting]);
    };
  });
