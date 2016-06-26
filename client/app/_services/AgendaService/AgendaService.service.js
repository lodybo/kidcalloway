'use strict';

angular.module('kidCallowayApp')
  .service('AgendaService', function ($resource) {
    var apiURL = "/api/agenda/";
    
    // *** Private methods
    // Switch between get and getAll based on args
    var __get = function (id) {
        if (id) {
            return _getOne(id);
        }
        
        return _getAll();
    };
    
    // *** Public methods
    var _getAll = function() {
        // Get all records and return them
        var endpoint = $resource(apiURL);
        return endpoint.query().$promise;
    };
    
    var _getOne = function (gigID) {
        var endpoint = $resource(apiURL + ":id", {
            id: "@id"
        });
        
        return endpoint.get({
            id: gigID
        }).$promise;
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
            date: gig.date.toISOString(),
            time: gig.time,
            venue: gig.venue,
            address: gig.address,
            fbEvent: gig.fbEvent,
            ticket: ticket,
            details: details
        }).$promise;
    };
    
    var _editGig = function(newGig) {
        // First: get the existing gig from the server
        var endpoint = $resource(apiURL + "id/:id", {
            id: "@id"
        });

        return endpoint.save({
            id: newGig.id
        }, {
            date: newGig.date,
            time: newGig.time,
            venue: newGig.venue,
            address: newGig.address,
            fbEvent: newGig.fbEvent,
            ticket: newGig.ticket,
            details: newGig.details
        }).$promise;
    };

    var _deleteGig = function(id) {
        var endpoint = $resource(apiURL + "id/:id", {
            id: "@id"
        });

        return endpoint.delete({
            id: id
        }).$promise;
    };
    
    // Return public functions
    return {
        get: __get,
        addGig: _addGig,
        editGig: _editGig,
        deleteGig: _deleteGig
    };
  });
