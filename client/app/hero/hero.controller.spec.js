'use strict';

describe('Controller: HeroCtrl', function () {

  // load the controller's module
  beforeEach(module('kidCallowayApp'));

  var HeroCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HeroCtrl = $controller('HeroCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
