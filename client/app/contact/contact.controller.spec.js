'use strict';

describe('Controller: ContactCtrl', function () {

  // load the controller's module
  beforeEach(module('kidCallowayApp'));

  var ContactCtrl, scope, elemPhone, elemMail, httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    ContactCtrl = $controller('ContactCtrl', {
      $scope: scope
    });
    httpBackend = $httpBackend;

    httpBackend.expect("GET", "/api/settings/rollbarsettings").respond(200, {
      token: "",
      environment: "test"
    });
    httpBackend.flush();
  }));

  beforeEach(inject(function ($compile) {
    elemPhone = angular.element('<a class="phone" href="" ng-click="changeContactDetails($event, \'phone\')">+31 (0)6 15 07 040 08</a>');
    elemMail = angular.element('<a class="mail" href="" ng-click="changeContactDetails($event, \'mail\')">info [at] Kid Calloway .nl</a> <br />');

    elemPhone = $compile(elemPhone)(scope);
    elemMail = $compile(elemMail)(scope);

    scope.$apply();
  }));

  it("should display empty anchors for the contact links", function () {
    expect(elemPhone.attr("href")).toBe("");
    expect(elemMail.attr("href")).toBe("");
  });

  it("should change the empty anchor of the telephone to filled one on click", function () {
    elemPhone.click();

    scope.$apply();

    expect(elemPhone.attr("href")).toBe(scope.contactDetails.phone);
  });

  it("should change the empty anchor of the mailaddress to the filled one on click", function () {
    elemMail.click();

    scope.$apply();

    expect(elemMail.attr("href")).toBe(scope.contactDetails.mail);
  });
});
