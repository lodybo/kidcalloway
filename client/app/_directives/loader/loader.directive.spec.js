'use strict';

describe('Directive: loader', function () {

  // load the directive's module and view
  beforeEach(module('kidCallowayApp'));
  beforeEach(module('app/_directives/loader/loader.html'));

  var element, scope, httpBackend;

  beforeEach(inject(function ($rootScope, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    httpBackend.expect("GET", "/api/settings/rollbarsettings").respond (200, {});
    httpBackend.flush();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<loader></loader>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element).not.toBe(undefined);
  }));
});