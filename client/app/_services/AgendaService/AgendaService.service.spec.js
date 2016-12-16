'use strict';

fdescribe('Service: AgendaService', function () {

  // load the service's module
  beforeEach(module('kidCallowayApp'));

  // instantiate service
  var AgendaService, httpBackend;
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
    }
  ];

  beforeEach(inject(function (_AgendaService_, $httpBackend) {
    httpBackend = $httpBackend;
    AgendaService = _AgendaService_;

    httpBackend.expect("GET", "/api/settings/rollbarsettings").respond(200, {
      token: "1234567890",
      environment: "dev"
    });
    httpBackend.flush();
  }));

  afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
   });

  it("should get all the gigs", function () {
    httpBackend.expect("GET", "/api/agenda").respond(200, response);

    var promise = AgendaService.get();
    httpBackend.flush();

    promise.then(function (items) {
      expect(items.length).toBe(response.length);
    }).catch(function (error) {
      throw new Error(error);
    });
  });

  it("should get one gig", function () {
    httpBackend.expect("GET", "/api/agenda/0").respond(200, response[0]);

    var promise = AgendaService.get("0");
    httpBackend.flush();

    promise.then(function (item) {
      for (var i = 0; i < Object.keys(response[0]).length; i++) {
        var prop = Object.keys(response)[i];
        if (response[0].hasOwnProperty(prop)) {
          expect(item[prop]).toBe(response[0][prop]);
        }
      }
    }).catch(function (error) {
      throw new Error(error);
    });
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
      for (var i = 0; i < Object.keys(response[0]).length; i++) {
        var prop = Object.keys(response)[i];
        if (response[0].hasOwnProperty(prop)) {
          expect(item[prop]).toBe(response[0][prop]);
        }
      }
    }).catch(function (error) {
      throw new Error(error);
    });
  });
});
