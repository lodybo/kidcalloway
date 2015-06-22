angular.module("agendaApp", ["ngResource"]).controller("agendaCtrl", ["$scope", "$resource", function($scope, $resource) {
	$scope.test = "succeeded";
}]);