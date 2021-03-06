'use strict';

angular.module('kidCallowayApp')
  .service('AgendaService', function ($resource) {
    var apiURL = "/api/agenda/";
    
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

    var _next = function () {
        var endpoint = $resource(apiURL + 'next');

        return endpoint.get().$promise.then(function (gig) {
            var result = gig.toJSON();
            
            if (!result.message) {
                return result;
            }

            return;
        });
    };
    
    var _addGig = function (gig) {
        // First: if 'ticket', 'facebook' and 'details' are null, change that to a string form. We'll strip it on the server
        var ticket, details, fbEvent;
        ticket = gig.ticket === null ? "null" : gig.ticket;
        fbEvent = gig.fbEvent === null ? "null" : gig.fbEvent;
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
            fbEvent: fbEvent,
            ticket: ticket,
            details: details
        }).$promise;
    };
    
    var _editGig = function(newGig) {
        // First: get the existing gig from the server
        var endpoint = $resource(apiURL + "id/:id", {
            id: "@id"
        }, {
            'update': { method:'PUT' }
        });

        return endpoint.update({
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

    var _cancelGig = function (id) {
        var endpoint = $resource(apiURL + "id/:id/cancel/true", {
            id: "@id"
        }, {
            "cancel": {
                method: "PUT"
            }
        });

        return endpoint.cancel({
            id: id
        }).$promise;
    };

    // *** Private methods
    // Switch between get and getAll based on args
    var __get = function (id) {
        if (id) {
            return _getOne(id);
        }
        
        return _getAll();
    };
    
    // Return public functions
    return {
        get: __get,
        next: _next,
        addGig: _addGig,
        editGig: _editGig,
        deleteGig: _deleteGig,
        cancelGig: _cancelGig
    };
  });
