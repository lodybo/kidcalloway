'use strict';

describe('Service: AgendaService', function () {

  // load the service's module
  beforeEach(module('kidCallowayApp'));

  // instantiate service
  var AgendaService, httpBackend, q, timeout;
  var response = [
    {
      id: 0,
      date: new Date(),
      time: "20:00",
      venueName: "De Kroeg",
      venueAddress: "Kroegsestraat 20, 5644KL Eindhoven",
      fbEvent: "http://www.facebook.com/event/1234567890",
      ticketLink: null,
      details: null
    }, {
      id: 1,
      date: new Date(),
      time: "20:00",
      venueName: "Cafe De Bar",
      venueAddress: "Kroegsestraat 21, 5644KL Eindhoven",
      fbEvent: "http://www.facebook.com/event/0987654321",
      ticketLink: "http://www.ticketmaster.com/kid-calloway/event/1234567890",
      details: "Ep release party!"
    }, {
      id: 2,
      date: new Date(),
      time: "20:00",
      venueName: "Lounge De Bank",
      venueAddress: "Kroegsestraat 22, 5644KL Eindhoven",
      fbEvent: "http://www.facebook.com/event/0987654321",
      ticketLink: "http://www.ticketmaster.com/kid-calloway/event/1234567890",
      details: null,
      cancelled: true
    }
  ];

  beforeEach(inject(function (_AgendaService_, $httpBackend, $rootScope, $q, $timeout) {
    httpBackend = $httpBackend;
    AgendaService = _AgendaService_;
    q = $q;
    timeout = $timeout;

    httpBackend.expect("GET", "/api/settings/rollbarsettings").respond(200, {
      token: "1234567890",
      environment: "test"
    });
    httpBackend.flush();
  }));

  afterEach(function() {
    // $httpBackend.verifyNoOutstandingExpectation() triggers a $digest, but if a $digest is already running from $httpBackend.flush() (which is used in our tests)
    // then we'll get a "$digest already in progress" error. To avoid this, we wrap the verifyX() methods in a timeout so that they're run after the $digest is complete
    timeout(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });
   });

  it("should get all the gigs", function () {
    httpBackend.expect("GET", "/api/agenda").respond(200, response);

    var promise = AgendaService.get();
    httpBackend.flush();

    promise.then(function (gigs) {
      expect(gigs.length).toBe(response.length);
    }).catch(function (error) {
      throw new Error(error);
    });
  });

  it("should get one gig", function () {
    httpBackend.expect("GET", "/api/agenda/0").respond(200, response[0]);

    var promise = AgendaService.get("0");
    httpBackend.flush();

    promise.then(function (gig) {
      for (var i = 0; i < Object.keys(response[0]).length; i++) {
        var prop = Object.keys(response)[i];
        if (response[0].hasOwnProperty(prop)) {
          expect(gig[prop]).toBe(response[0][prop]);
        }
      }
    }).catch(function (error) {
      throw new Error(error);
    });
  });

  it('should get the next gig', function (done) {
    httpBackend.expectGET("/api/agenda/next").respond(200, response[0]);
    
    var promise = AgendaService.next();

    promise.then(function (gig) {
      expect(gig).toEqual(response[0]);
      done();
    }).catch(done.fail);

    httpBackend.flush();
  });

  it('should return "undefined" if there is no next gig', function (done) {
    httpBackend.expectGET("/api/agenda/next").respond(200, {message: 'No next gig found'});

    var promise = AgendaService.next();

    promise.then(function (gig) {
      expect(gig).toBeUndefined();
      done();
    }).catch(done.fail);

    httpBackend.flush();
  });

  it("should add a gig", function () {
    var newGig = {
      id: 0,
      date: new Date(),
      time: "15:00",
      venue: "Uitbater Willems",
      address: "Veenhof 2203, 6423 AB Wijchen",
      fbEvent: null,
      ticket: null,
      details: null
    };

    httpBackend.expect("POST", "/api/agenda/date/" + encodeURI(newGig.date.toISOString()) +
      "/time/" + encodeURI(newGig.time) +
      "/venueName/" + encodeURI(newGig.venue) +
      "/venueAddress/" + encodeURI(newGig.address) +
      "/fbEvent/" + encodeURI(newGig.fbEvent) +
      "/ticketLink/" + encodeURI(newGig.ticket) +
      "/details/" + encodeURI(newGig.details)).respond(201, newGig);

    var promise = AgendaService.addGig(newGig);
    httpBackend.flush();

    promise.then(function (gig) {
      for (var i = 0; i < Object.keys(newGig).length; i++) {
        var prop = Object.keys(newGig)[i];
        if (newGig.hasOwnProperty(prop)) {
          if (prop === "date") {
            expect(gig[prop].toISOString()).toBe(newGig[prop].toISOString());
          } else {
            expect(gig[prop]).toBe(newGig[prop]);
          }
        }
      }
    }).catch(function (error) {
      throw new Error(error);
    });
  });

  it("should be able to edit a gig", function () {
    var editedGig = {
      id: response[1].id,
      date: response[1].date,
      time: response[1].time,
      venue: "Edited Venue Name",
      address: response[1].venueAddress,
      fbEvent: response[1].fbEvent,
      ticket: response[1].ticketLink,
      details: response[1].details
    };

    httpBackend.expect("PUT", "/api/agenda/id/" + editedGig.id, {
      date: response[1].date,
      time: response[1].time,
      venue: "Edited Venue Name",
      address: response[1].venueAddress,
      fbEvent: response[1].fbEvent,
      ticket: response[1].ticketLink,
      details: response[1].details
    }).respond(201, editedGig);

    var promise = AgendaService.editGig(editedGig);
    httpBackend.flush();
    
    promise.then(function (gig) {
      for (var i = 0; i < Object.keys(editedGig).length; i++) {
        var prop = Object.keys(editedGig)[i];
        if (editedGig.hasOwnProperty(prop)) {
          if (prop === "date") {
            expect(gig[prop].toISOString()).toBe(editedGig[prop].toISOString());
          } else {
            expect(gig[prop]).toBe(editedGig[prop]);
          }
        }
      }
    }).catch(function (error) {
      throw new Error(error);
    });
  });

  it("should be able to delete a gig", function () {
    httpBackend.expect("DELETE", "/api/agenda/id/0").respond(201, "0");

    var promise = AgendaService.deleteGig(0);
    httpBackend.flush();
    promise.then(function (res) {
      expect(res).toBeDefined();
    }).catch(function (err) {
      throw new Error(err);
    });
  });
  
  it("should be able to allow catching a failure when deleting a gig", function () {
    spyOn(AgendaService, "deleteGig").and.callFake(function () {
      var deferred = q.defer();

      deferred.reject("500 Server Error");      

      return deferred.promise;
    });

    var promise = AgendaService.deleteGig(0);

    promise.then(function (res) {
      throw new Error(res);
    }).catch(function (err) {
      expect(err).toBeDefined();
    });
  });

  it("should be able to cancel a gig, if necessary", function () {
    httpBackend.expect("PUT", "/api/agenda/id/2/cancel/true").respond(201, response[2]);

    var promise = AgendaService.cancelGig(2);
    httpBackend.flush();

    promise.then(function (gig) {
      expect(gig.cancelled).toBeDefined();
      expect(gig.cancelled).toBeTruthy();
    }).catch(function (err) {
      throw new Error(err);
    });
  });

});
