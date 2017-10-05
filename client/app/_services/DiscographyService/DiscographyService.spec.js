'use strict';

fdescribe('Service: DiscographyService', function () {
  beforeEach(module('kidCallowayApp'));

  var discographyService, httpBackend;

  var successResponse = [
    {
      "name": "Born Again Man",
      "cover": "assets/images/KidC_cover.jpg",
      "release-date": "23-10-2015",
      "length": "10 mins",
      "tracklist": [
        {
          "name": "Achin' for Your Love",
          "length": "3:24"
        },
        {
          "name": "Be Mine",
          "length": "3:12"
        },
        {
          "name": "Born Again Man",
          "length": "3:58"
        }
      ]
    },
    {
      "name": "II",
      "cover": "assets/images/ep-II-cover.jpg",
      "release-date": "21-09-2017",
      "length": "10 mins",
      "tracklist": [
        {
          "name": "Witch",
          "length": "2:54"
        },
        {
          "name": "Little Billy",
          "length": "3:40"
        },
        {
          "name": "Laurels",
          "length": "4:07"
        }
      ]
    }
  ];

  beforeEach(inject(function ($httpBackend, DiscographyService) {
    httpBackend = $httpBackend;
    discographyService = DiscographyService;

    httpBackend.expect("GET", "/api/settings/rollbarsettings").respond(200, {
      token: "1234567890",
      environment: "test"
    });
    httpBackend.flush();
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should get all gigs', function () {
    httpBackend.expect('GET', '/assets/discography.json').respond(200, successResponse);

    var call = discographyService.get();
    httpBackend.flush();

    call.then(function (list) {
      expect(list).toEqual(successResponse);
    }).catch(function (error) {
      throw new Error(error);
    });
  });

  it('should get one specific gig', function () {
    httpBackend.expect('GET', '/assets/discography.json').respond(200, successResponse);

    var call = discographyService.get('II');
    httpBackend.flush();

    call.then(function (album) {
      expect(album).toEqual(successResponse[1]);
    }).catch(function (error) {
      throw new Error(error);
    });
  });
});