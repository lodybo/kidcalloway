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
    
    // *** Validation helper functions
    // This function tests to see if the input is not empty
    $scope.isNotEmpty = function (input) {
        return input.toString().length > 0;
    };
    
    // This function returns whether or not the email field was $valid or not
    $scope.validEmail = function () {
        return $scope.orderForm.email.$valid;
    };
    
    // *** Validation handling
    // This function gets called when the "submit" has been clicked, it runs the validation helper functions and chooses which action to take
    $scope.validate = function () {
        // Setup error object
        var errors = [];
        var emptyFields = 0;
        
        // Now lets check if all fields have been filled in
        Object.keys($scope.formInput).forEach(function (key) {
            if (!$scope.isNotEmpty($scope.formInput[key])) {
                emptyFields++;
            }
        });
        
        // Check if there were any empty fields
        if (emptyFields > 0) {
            errors.push("Missing parameter(s)");
        }
        
        // Now the email field: is it really an emailaddress?
        if ($scope.formInput.email.length > 0) {
            if (!$scope.validEmail()) {
                errors.push("Incorrect mailadres");
            }
        }
        
        // Check if there were any errors found
        if (errors.length > 0) {
            // Errors! Send them to the validation error handler!
            $scope.validationErrorHandler();
            return;
        }
        
        // Nope, nothing found, so we can show the success banner!
        $scope.showToggles.success = true;
    };
}]);