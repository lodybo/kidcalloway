describe("Agenda functionality", function () {
	beforeEach(function () {
		module("agendaApp");
	});
	
	var $rootScope;
	var $controller;
	var $scope;
	
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		$controller = _$controller_;
		
		var scopes = {
			$rootScope: $rootScope,
			$scope: $scope
		};
		
		$controller("agendaCtrl", scopes);
	}));
	
	describe("Getting the controller", function() {
		expect($scope.test).toBe("succeeded");
	});
});