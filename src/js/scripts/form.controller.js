angular.module("KidC_App").controller("formController", ["$scope", function ($scope) {
    // Models for the form input
    $scope.formInput = {
        name: "",
        email: "",
        amount: 1,
        address: ""
    };
    
    // Toggles for the loader icon, success result and error result
    $scope.showToggles = {
        loader: false,
        success: false,
        error: false
    };
    
    // This function tests to see if the input is not empty
    $scope.isNotEmpty = function (input) {
        return input.length > 0;
    };
    
    // This function returns whether or not the email field was $valid or not
    $scope.validEmail = function () {
        return $scope.orderForm.email.$valid;
    };
}]);