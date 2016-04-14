'use strict';

angular.module('kidCallowayApp')
  .service('AgendaService', function ($resource) {
    var apiURL = "/api/agenda/";
    
    // *** Private methods
    
    // *** Public methods
    var _getAll = function() {
        // Get all records and return them
        var endpoint = $resource(apiURL);
        return endpoint.query().$promise;
    };
    
    var _addGig = function (gig) {
        var endpoint = $resource(apiURL + "date/:date/time/:time/venue/:venue/address/:address/fbEvent/:fbEvent/ticket/:ticket/details/:details", {
            date: "@date",
            time: "@time",
            venue: "@venue",
            address: "@address",
            fbEvent: "@fbEvent",
            ticket: "@ticket",
            details: "@details"
        });
        
        return endpoint.save({
            date: gig.date,
            time: gig.time,
            venue: gig.venue,
            address: gig.address,
            fbEvent: gig.fbEvent,
            ticket: gig.ticket,
            details: gig.details
        }).$promise;
    };
    
    // Return public functions
    return {
        get: _getAll,
        addGig: _addGig
    };
  });
