'use strict';

describe('Controller: SiteSettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('kidCallowayApp'));

  var SiteSettingsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SiteSettingsCtrl = $controller('SiteSettingsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
