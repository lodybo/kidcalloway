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
        // First: if 'ticket' and 'details' are null, change that to a string form. We'll strip it on the server
        var ticket, details;
        ticket = gig.ticket === null ? "null" : gig.ticket;
        details = gig.details === null ? "null" : gig.details;
        
        var endpoint = $resource(apiURL + "date/:date/time/:time/venueName/:venue/venueAddress/:address/fbEvent/:fbEvent/ticketLink/:ticket/details/:details", {
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
            ticket: ticket,
            details: details
        }).$promise;
    };
    
    // Return public functions
    return {
        get: _getAll,
        addGig: _addGig
    };
  });
