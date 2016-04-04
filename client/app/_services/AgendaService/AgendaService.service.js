'use strict';

angular.module('kidCallowayApp')
  .service('AgendaService', function ($resource) {
    var endpoint = $resource("/api/agenda");
    
    // *** Private methods
    
    // *** Public methods
    var _getAll = function() {
        // Get all records and return them
        return endpoint.get({}).then(function (response) {
            return response.data;
        });
    };
    
    // Return public functions
    return {
        get: getAll
    };
  });
