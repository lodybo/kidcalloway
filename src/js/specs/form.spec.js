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

	describe("Doing the validation", function() {
		it("should test if form inputs are not empty", function () {
			$scope.formInput.email = "lody@lody.nl";
            
            var resultEmpty = $scope.isNotEmpty($scope.formInput.name);
            var resultNotEmpty = $scope.isNotEmpty($scope.formInput.email);
            
            expect(resultEmpty).toBe(false);
            expect(resultNotEmpty).toBe(true); 
		});
        
        describe("calling the error validation handler correctly", function () {
            it("should report on missing fields", function () {
                $scope.formInput = {
                    name: "lody",
                    email: "lody@lody.nl",
                    amount: 1,
                    address: ""
                };
                
                $scope.validationErrorHandler(["Missing parameter(s)"]);
                
                expect($scope.validationErrors.missingParameters).toBe(true);
                expect($scope.validationErrors.wrongFields.length).toBe(1);
                expect($scope.validationErrors.wrongFields[0]).toBe("address");
            });
            
            it("should report on wrong mailadresses", function() {
                $scope.formInput = {
                    name: "lody",
                    email: "lody@lody",
                    amount: 1,
                    address: "asd"
                };
                
                $scope.validationErrorHandler(["Incorrect mailadres"]);
                
                expect($scope.validationErrors.incorrectMailaddress).toBe(true);
                expect($scope.validationErrors.wrongFields.length).toBe(1);
                expect($scope.validationErrors.wrongFields[0]).toBe("email");
            });
        });
	});
});
