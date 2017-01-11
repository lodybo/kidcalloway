'use strict';

describe('Testing the Cta controller', function () {

  // load the controller's module
  beforeEach(module('kidCallowayApp'));

  var CtaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CtaCtrl = $controller('CtaCtrl', {
      $scope: scope
    });
  }));

  xit('should ...', function () {
    expect(1).toEqual(1);
  });
});
