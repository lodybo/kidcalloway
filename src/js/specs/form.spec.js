describe("Form Controller functionality", function () {
	"use strict";

	var $rootScope;
	var $controller;
	var $scope;
	var $httpBackend;

	beforeEach(module("KidC_App"));

	beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;

		var scopes = {
			$rootScope: $rootScope,
			$scope: $scope
		};

		$controller("formController", scopes);
	}));

	describe("Getting the controller", function() {
		it ("should be able to reach the controller", function () {
			expect(true).toBe(true); 
		});
	});
});
