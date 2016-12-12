'use strict';

fdescribe('Controller: SiteSettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('kidCallowayApp'));

  var SiteSettingsCtrl, scope, httpBackend, rollbar;
  var settings = [
    {
      name: "test",
      value: "setting"
    }, {
      name: "another",
      value: "setting"
    }
  ];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, Rollbar) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    rollbar = Rollbar;

    httpBackend.expect("GET", "/api/settings/rollbarsettings").respond(200, {
      token: "123456",
      environment: "dev"
    });

    SiteSettingsCtrl = $controller('SiteSettingsCtrl', {
      $scope: scope
    });
  }));

  it('should retreive the settings', function () {
    httpBackend.expect("GET", "/api/settings").respond(200, settings);
    httpBackend.flush();

    for (var i = 0; i < settings.length; i++) {
      expect(scope.settingsForm[settings[i].name]).toBe(settings[i].value);
    }
  });

  it("should gracefully handle errors", function () {
    spyOn(rollbar, "error");
    httpBackend.expect("GET", "/api/settings").respond(500, "Unexpected error");
    httpBackend.flush();
    
    expect(rollbar.error).toHaveBeenCalled();
    expect(scope.errors.show).toBe(true);
    expect(scope.errors.message).toBe("Er is iets fout gegaan met het ophalen van de settings.");
  });
});
