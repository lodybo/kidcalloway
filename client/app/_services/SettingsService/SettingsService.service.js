'use strict';

angular.module('kidCallowayApp')
  .service('SettingsService', function ($resource) {
    var apiEndpoint = "/api/settings";

    // *** Private functions
    // Get all settings from the API
    var __getAll = function () {
      var endpoint = $resource(apiEndpoint);

      return endpoint.query().$promise;
    };

    // Get one specific setting from the API
    var __getOne = function(settingName) {
      var endpoint = $resource(apiEndpoint + "/name/:name", {
        name: "@name"
      });

      return endpoint.get({
        name: settingName
      }).$promise;
    };

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
    };

    // Update specific setting
    var _update = function(setting, value) {
      var endpoint = $resource(apiEndpoint + "/name/:name/value/:value", {
        name: "@name",
        value: "@value"
      }, {
        "update": {
          method: "PUT"
        }
      });

      return endpoint.update({
        name: setting,
        value: value
      }).$promise;
    };

    return {
      get: _get,
      update: _update
    };
  });
