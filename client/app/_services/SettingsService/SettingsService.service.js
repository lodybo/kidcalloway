'use strict';

angular.module('kidCallowayApp')
  .service('SettingsService', function ($resource) {
    var apiEindpoint = "/api/settings";

    // *** Private functions
    // Get all settings from the API
    var __getAll = function () {
      var endpoint = $resource(apiEindpoint);

      return endpoint.query().$promise;
    };

    // Get one specific setting from the API
    var __getOne = function(settingName) {
      var endpoint = $resource(apiEindpoint + "/name/" + settingName);

      return endpoint.get().$promise;
    }

    // *** Public functions
    // Get either one or all the settings
    var _get = function(name) {
      // See if a name has been specified
      if (typeof name === "undefined") {
        // GET ALL THE SETTINGS!
        return __getAll();
      }

      // Get one setting
      return __getOne(name);
    }

    return {
      get: _get
    };
  });
