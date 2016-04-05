'use strict';

describe('Controller: AgendaCtrl', function () {

  // load the controller's module
  beforeEach(module('kidCallowayApp'));

  var AgendaCtrl, scope, httpBackend, timeout;
  
  var response = [{"_id":"57029107e9b358540d524ab8","venueName":"Kaffee Lambiek","venueAddress":"Wilhelminapark 66, 5041 ED Tilburg, Netherlands","details":"Kid Calloway speelt samen met Endfield bij Kaffee Lambiek!","fbEvent":"https://www.facebook.com/events/1666492276937175/","ticketLink":"","date":"2016-04-04T16:06:31.000Z","time":"20:00","played":false,"cancelled":false,"__v":0},{"_id":"57029107e9b358540d524ab9","venueName":"Kingsday at the <a href='http://www.bluecollarhotel.nl/'>Blue Collar Hotel</a>","venueAddress":"Klokgebouw 10 Strijp S Eindhoven","details":"Kom met Kid Calloway Koningsdag 2016 vieren in de parkeergarage tegenover het Blue Collar Hotel!","fbEvent":"https://www.facebook.com/events/443752132491052/","ticketLink":"","date":"2016-04-04T16:06:31.000Z","time":"Tussen 14:00 en 16:00","played":false,"cancelled":false,"__v":0},{"_id":"57029107e9b358540d524aba","venueName":"Velvet Music IN STORE","venueAddress":"Torenallee 60-02 unit 8, 5617 BD Eindhoven","details":"28 maart viert Velvet Music Pasen in haar splinternieuwe zaak in de Urban Shopper op Strijp-S en Kid Calloway is erbij, met wel een heel speciaal optreden!","fbEvent":"https://www.facebook.com/events/1740638226152484/","ticketLink":"","date":"2016-04-04T16:06:31.000Z","time":"15:00","played":true,"cancelled":false,"__v":0},{"_id":"57029107e9b358540d524abb","venueName":"Stage Music Cafe","venueAddress":"Stratumseind 25, 5611 EN Eindhoven","details":"Kid Calloway doet mee aan de 3e Rocktocht Eindhoven 2016","fbEvent":"https://www.facebook.com/events/922352567860696/","ticketLink":"","date":"2016-04-04T16:06:31.000Z","time":"16:30","played":true,"cancelled":false,"__v":0},{"_id":"57029107e9b358540d524abc","venueName":"Cafe 't Spektakel","venueAddress":"Prins Bernhardstraat 44, 5721 GC Asten","details":"Kid Calloway viert het weekend in Cafe 't Spektakel","fbEvent":"https://www.facebook.com/events/1678462842424757/","ticketLink":"","date":"2016-04-04T16:06:31.000Z","time":"21:30","played":false,"cancelled":false,"__v":0}];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $timeout) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    timeout = $timeout;
    
    AgendaCtrl = $controller('AgendaCtrl', {
      $scope: scope
    });
  }));
  
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe("Getting a list of agenda items from the service", function () {
    it('should retrieve call the service upon load with a requests for all gigs', function () {
        httpBackend.expectGET("/api/agenda").respond(200, response);
        httpBackend.flush();
    });
    
    
    it("should get a list from the service with all the gigs", function (done) {
        httpBackend.expectGET("/api/agenda").respond(200, response);
        
        expect(scope.gigs.length).toBe(0);
        
        httpBackend.flush();
        
        timeout(function () {
            expect(scope.gigs.length).toBe(response.length);
            done();
        }, 0);
    });
  });
  
});
