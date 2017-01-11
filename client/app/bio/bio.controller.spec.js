'use strict';

describe('Testing the Bio controller', function () {

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

  xit('should ...', function () {
    expect(1).toEqual(1);
  });
});
