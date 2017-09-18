fdescribe('The Next Gig Class', function () {
  var httpBackend, componentController;

  var response = [{
    "_id": "57029107e9b358540d524ab8",
    "venueName": "Kaffee Lambiek",
    "venueAddress": "Wilhelminapark 66, 5041 ED Tilburg, Netherlands",
    "details": "Kid Calloway speelt samen met Endfield bij Kaffee Lambiek!",
    "fbEvent": "https://www.facebook.com/events/1666492276937175/",
    "ticketLink": "",
    "date": "2016-04-04T16:06:31.000Z",
    "time": "20:00",
    "played": false,
    "cancelled": false,
    "__v": 0
  }];

  beforeEach(module('kidCallowayApp'));

  beforeEach(inject(function ($httpBackend, $componentController) {
    httpBackend = $httpBackend;
    componentController = $componentController;

    httpBackend.expect("GET", "/api/settings/rollbarsettings").respond(200, {
      token: "",
      environment: "test"
    });
    httpBackend.flush();
  }))

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  xit('should sent out a request for a gigs', function () {
    httpBackend.expectGET("/api/agenda").respond(200);
    
    var ctrl = componentController('nextGig', null, {});
  });
});