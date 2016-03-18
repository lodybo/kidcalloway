'use strict';

describe('Controller: BioCtrl', function () {

  // load the controller's module
  beforeEach(module('kidCallowayApp'));

  var BioCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BioCtrl = $controller('BioCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
