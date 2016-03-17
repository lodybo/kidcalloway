'use strict';

describe('Controller: AgendaCtrl', function () {

  // load the controller's module
  beforeEach(module('kidCallowayApp'));

  var AgendaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AgendaCtrl = $controller('AgendaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
