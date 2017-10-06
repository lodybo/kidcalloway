'use strict';

angular.module('kidCallowayApp')
  .service('DiscographyService', function ($resource) {
    var apiUrl = "/assets/discography.json";

    function _getAll() {
      var endpoint = $resource(apiUrl);

      return endpoint.query().$promise.then(function (response) {
        return response.map(function (item) {
          return item.toJSON();
        });
      });
    }

    function _getOne(name) {
      return _getAll().then(function (list) {
        for (var i=0; i<list.length; i++) {
          if (list[i].name === name) {
            return list[i];
          }
        }
      });
    }

    function get(name) {
      if (name) {
        return _getOne(name);
      }

      return _getAll();
    }

    return {
      get: get
    };
  });