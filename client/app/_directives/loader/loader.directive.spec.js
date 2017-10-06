'use strict';

describe('Directive: loader', function () {

  // load the directive's module and view
  beforeEach(module('kidCallowayApp'));
  beforeEach(module('app/_directives/loader/loader.html'));

  var element, scope, httpBackend;
  var loaderScope = {
    classes: "col-xs-1 col-xs-push-5 col-sm-push-5 col-md-push-5",
    animate: true,
    visible: true
  };

  beforeEach(inject(function ($rootScope, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    httpBackend.expect("GET", "/api/settings/rollbarsettings").respond(200, {
      token: "1234567890",
      environment: "test"
    });
    httpBackend.flush();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<loader></loader>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element).not.toBe(undefined);
  }));

  describe("manipulating the scope of the loader", function () {
    beforeEach(inject(function ($compile) {
      element = angular.element("<loader loader-scope='loaderScope'></loader>");
      scope.loaderScope = loaderScope;
      
      element = $compile(element)(scope);
      scope.$apply();
    }));

    it("should have the classes defined in the loader scope", function () {
      expect(element.children()[0].className.indexOf(loaderScope.classes)).toBeGreaterThan(-1);
    });

    it("should have the 'animated' class defined", function () {
      expect(element.children()[0].className.indexOf("animate")).toBeGreaterThan(-1);
    });

    it("should have the 'animated' class removed if set in the loader scope", function () {
      scope.loaderScope.animate = false;
      scope.$apply();
      expect(element.children()[0].className.indexOf("animate")).toBeLessThan(0);
    });

    it("should be visible", function () {
      expect(element.children()[0].className.indexOf("ng-hide")).toBeLessThan(0);
    });

    it("should be hidden when visible is turned off in loader scope", function () {
      scope.loaderScope.visible = false;
      scope.$apply();
      expect(element.children()[0].className.indexOf("ng-hide")).toBeGreaterThan(-1);
    });
  });
});