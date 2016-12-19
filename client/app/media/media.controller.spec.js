'use strict';

describe('Testing the Media controller', function () {

  // load the controller's module
  beforeEach(module('kidCallowayApp'));

  var MediaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MediaCtrl = $controller('MediaCtrl', {
      $scope: scope
    });
  }));

  xit('should ...', function () {
    expect(1).toEqual(1);
  });
});
