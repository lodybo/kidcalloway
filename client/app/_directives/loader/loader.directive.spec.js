'use strict';

describe('Directive: loader', function () {

  // load the directive's module and view
  beforeEach(module('kidCallowayApp'));
  beforeEach(module('app/_directives/loader/loader.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<loader></loader>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element).not.toBe(undefined);
  }));
});