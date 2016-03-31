angular.module("KidC_App").controller("formController", ["$scope", "$timeout", function ($scope, $timeout) {
    // Models for the form input
    $scope.formInput = {
        name: "",
        email: "",
        amount: 1,
        address: ""
    };
    
    // Toggles for the loader icon, success result and error result and the order form
    $scope.showToggles = {
        loader: false,
        animateLoader: false,
        success: false,
        error: false,
        form: true
    };
    
    // Show the order form
    $scope.showForm = function () {
        $scope.showToggles.form = true;
        $scope.showToggles.success = false;
    };
    
    // Validation errors
    $scope.validationErrors = {
        missingParameters: false,
        incorrectMailaddress: false,
        wrongFields: []
    };
    
    // *** Validation helper functions
    // This function tests to see if the input is not empty
    $scope.isNotEmpty = function (input) {
        if (input === undefined) {
            input = "";
        }
        
        return input.toString().length > 0;
    };
    
    // This function returns whether or not the email field was $valid or not
    $scope.validEmail = function () {
        return $scope.orderForm.email.$valid;
    };
    
    // This function checks if the given field is in the array of wrong fields
    $scope.isWrongField = function (field) {
        return $scope.validationErrors.wrongFields.indexOf(field) > -1;
    };
    
    // *** Validation handling
    // This function gets called when the "submit" has been clicked, it runs the validation helper functions and chooses which action to take
    $scope.validate = function () {
        // Setup error object
        var errors = [];
        var emptyFields = 0;
        
        // Reset validation errors cues
        $scope.validationErrors = {
            missingParameters: false,
            incorrectMailaddress: false,
            wrongFields: []
        };
        
        $scope.showToggles.success = false;
        $scope.showToggles.error = false;
        
        // Now lets check if all fields have been filled in
        Object.keys($scope.formInput).forEach(function (key) {
            if ($scope.formInput[key] !== undefined && !$scope.isNotEmpty($scope.formInput[key])) {
                emptyFields++;
            }
        });
        
        // Check if there were any empty fields
        if (emptyFields > 0) {
            errors.push("Missing parameter(s)");
        }
        
        // Now the email field: is it really an emailaddress?
        if ($scope.isNotEmpty($scope.formInput.email) && $scope.formInput.email !== undefined) {
            // Only check validity if something has actually been entered
            if (!$scope.validEmail()) {
                errors.push("Incorrect mailadres");
            }
        }
        else {
            // Either the input is wrong (not a real e-mailaddress) or it is empty
            // We only show it if it's wrong, so formInput.email should be "undefined"
            if ($scope.formInput.email === undefined) {
                errors.push("Incorrect mailadres");
            }
        }
        
        // Check if there were any errors found
        if (errors.length > 0) {
            // Errors! Send them to the validation error handler!
            $scope.validationErrorHandler(errors);
            return;
        }
        
        // Nope, nothing found, so we can send the form!
        $scope.validationSuccessHandler();
    };
    
    // This function takes care of sending the form input, and setting all the success cues
    $scope.validationSuccessHandler = function() {
        // First: show the loader and hide the form while we're making a request to the mailer script
        $scope.showToggles.loader = true;
        $scope.showToggles.animateLoader = true;
        $scope.showToggles.form = false;
        
        // For now, mimick a long request
        $timeout(function () {
            // Done!
        $scope.showToggles.success = true;
        $scope.showToggles.loader = false;
        $scope.showToggles.animateLoader = false;
        }, 2000);
    };
    
    // This function sorts out the errors and gives the appropriate visual cues back to the user
    $scope.validationErrorHandler = function (errors) {
        // Show error banner
        $scope.showToggles.error = true;
        
        // Get through each error on the error collection
        for (var i=0; i<errors.length; i++) {
            // If wrong mail address..
            if (errors[i] === "Incorrect mailadres") {
                // Set the validation object
                $scope.validationErrors.incorrectMailaddress = true;
                $scope.validationErrors.wrongFields.push("email");
            }
            
            // If empty fields..
            if (errors[i] === "Missing parameter(s)") {
                $scope.validationErrors.missingParameters = true;
                
                for (var j=0; j<Object.keys($scope.formInput).length; j++) {
                    var key = Object.keys($scope.formInput)[j];
                    var value = $scope.formInput[key];
                    if (!$scope.isNotEmpty(value)) {
                        $scope.validationErrors.wrongFields.push(key);
                    }
                }
            }
        }
    };
}]);