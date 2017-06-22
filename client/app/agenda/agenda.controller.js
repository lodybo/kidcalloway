'use strict';

angular.module('kidCallowayApp')
  .controller('AgendaCtrl', function ($scope, AgendaService, Auth) {
    // *** SETUP
    // Collections for the gig list and error list
    $scope.gigs = [];
    
    $scope.errors = {
        missingParameters: false,
        wrongInput: false,
        wrongFields: [],
        serviceError: false,
        serviceMessages: {
            serviceUnavailable: false,
            serviceErrorMessage: "",
            validationError: false
        }
    };
    
    $scope.formData = {
        id: null,
        date: new Date(),
        time: "20:00",
        venue: "Cafe De Kroeg",
        address: "Kroegseweg 12, Eindhoven",
        fbEvent: null,
        details: null,
        ticket: null
    };
    
    // Toggles for the loader icon, success result and error result and the order form
    $scope.showToggles = {
        success: false,
        error: false,
        form: false,
        status: false
    };
      
    // Toggles for (mostly success) states
    $scope.status = {
        createSuccess: false,
        editSuccess: false,
        deleteSuccess: false
    };

    $scope.loaderScope = {
        classes: "",
        animate: false,
        visible: false,
    };
    
    $scope.sortByDate = function (date) {
        var offTheJedi = new Date(date.date.raw);
        
        return offTheJedi; // Haha!
    };

    $scope.getNumberOfPlayedGigs = function () {
        var result = 0;

        for (var i=0; i<$scope.gigs.length; i++) {
            if (!$scope.gigs[i].played) {
                result++;
            }
        }

        return result;
    };
    
    // State of the editing form: new or edit.
    // Caption of the submit button adjusts to this state
    $scope.formState = {
        state: "new",
        submitButtonCaption: "Gig toevoegen aan agenda",
        editButtonCaption: "Gig bewerken",
        resetButtonCaption: "Stop met bewerken",
    };
    
    // Pass the isLoggedIn function from the Auth service to the view
    $scope.isLoggedIn = Auth.isLoggedIn;
    
    // *** GENERAL
    // Retrieve the data of all the gigs from the service
    $scope.getAllGigs = function () {
        AgendaService.get().then(function (gigs) {
            $scope.gigs = gigs;
        }, function (error) {
            $scope.handleErrors(true, error);
        });
    };
    $scope.getAllGigs();
    
    // *** ADD OR EDIT GIGS
    $scope.editGig = function (gigID) {
        // Set the form state to edit
        $scope.formState.state = "edit";
        $scope.resetStatuses();
        
        // Show the form if it's still hidden
        if (!$scope.showToggles.form) {
            $scope.showToggles.form = true;
        }
        
        // First get the gig we need to edit, and fill the form with its data
        AgendaService.get(gigID).then(function (gig) {
            $scope.formData = {
                id: gig._id,
                date: new Date(gig.date.raw),
                time: gig.time,
                venue: gig.venueName,
                address: gig.venueAddress,
                fbEvent: gig.fbEvent,
                details: gig.details,
                ticket: gig.ticketLink
            };
        }, function (error) {
            $scope.handleErrors(true, error);
        });
    };
    $scope.deleteGig = function (gigID) {
        $scope.resetStatuses();
        
        // Delete gig
        AgendaService.deleteGig(gigID).then(function () {
            // Refresh gig list
            $scope.getAllGigs();

            // Show message
            $scope.showToggles.status = true;
            $scope.status.deleteSuccess = true;
        }, function (errors) { 
            $scope.handleErrors(true, errors);
        });
    };
    $scope.cancelGig = function (gigID) {
        $scope.resetStatuses();

        // Cancel gig
        AgendaService.cancelGig(gigID).then(function () {
            // Refresh gig list
            $scope.getAllGigs();
        }, function (errors) {
            $scope.handleErrors(true, errors);
        });
    };
    
    // Reset the edit mode
    $scope.reset = function () {
        // Reset the form state
        $scope.formState.state = "new";
        
        // Reset form data
        $scope.formData = {
            id: null,
            date: new Date(),
            time: "20:00",
            venue: "Cafe De Kroeg",
            address: "Kroegseweg 12, Eindhoven",
            fbEvent: null,
            details: null,
            ticket: null
        };

        // Hide form
        $scope.showToggles.form = false;
        $scope.resetStatuses();
    };
    
    // Return AngularJS's input information
    $scope.getFieldData = function(field) {
        return $scope.agendaForm[field];
    };
    
    // Check if field is not empty
    $scope.isNotEmpty = function (input) {
        if (input === undefined || input === null) {
            input = "";
        }
        
        return input.toString().length > 0;
    };
    
    // Add field to the error collection if it's not already present in wrongFields
    $scope.addErrorField = function (field) {
        if ($scope.errors.wrongFields.indexOf(field) === -1) {
            $scope.errors.wrongFields.push(field);
        }
    };
    
    $scope.validate = function () {
        // Give visual cue that we're going to send data
        $scope.prepareToSend();
        
        // Reset error data
        $scope.resetErrors();
        
        // First check if every required field has been entered
        Object.keys($scope.formData).forEach(function (key) {
            // Exit if key is 'id'
            if (key === "id") {
                return;
            }
            
            var field = $scope.getFieldData(key);
            if (field.$required) {
                if (!$scope.isNotEmpty($scope.formData[key])) {
                    $scope.errors.missingParameters = true;
                    $scope.addErrorField(key);
                }
            }
            
            if (!field.$valid) {
                $scope.errors.wrongInput = true;
                $scope.addErrorField(key);
            }
        });
        
        // Check for errors
        if ($scope.errors.missingParameters || $scope.errors.wrongInput) {
            // Errors detected, stop preparing to send
            $scope.stopPrepareToSend("error");
            return;
        }
        
        // No errors, let's send!
        // Based on the form state, we either need to create a new gig or edit an existing one
        if ($scope.formState.state === "edit") {
            // Edit an existing one
            var editGig = AgendaService.editGig($scope.formData);
            //console.log("--- DEBUG editGig:", editGig);
            editGig.then(function () {
                //console.log("--- DEBUG in editGig");
                $scope.stopPrepareToSend("success");

                // Reset the edit state of the form
                $scope.reset();

                // Reset form data
                $scope.formData = {
                    id: null,
                    date: new Date(),
                    time: "20:00",
                    venue: "Cafe De Kroeg",
                    address: "Kroegseweg 12, Eindhoven",
                    fbEvent: null,
                    details: null,
                    ticket: null
                };
                
                // Refresh gig list
                $scope.gigs = [];
                $scope.getAllGigs();

                $scope.showToggles.status = true;
                $scope.status.editSuccess = true;
            }, function (errors) {
                $scope.handleErrors(true, errors);
            });
            
            // Exit function
            return;
        }
        
        // No id, so we need to add a new one
        AgendaService.addGig($scope.formData).then(function() {
            //console.debug("BBBBB");
            $scope.stopPrepareToSend("success");
            // Let's get the new gig list
            $scope.gigs = [];
            $scope.getAllGigs();
            $scope.showToggles.status = true;
            $scope.status.createSuccess = true;
        }, function (errors) {
            $scope.handleErrors(true, errors);
        });
    };
    
    // Prepare visual cues while we're preparing to send form input
    $scope.prepareToSend = function () {
        // Hide form, show and animate loader
        $scope.showToggles.form = false;
        $scope.loaderScope.visible = true;
        $scope.loaderScope.animate = true;
        
        // Hide visual cues for state
        $scope.showToggles.success = false;
        $scope.showToggles.error = false;
        $scope.resetStatuses();
    };
    
    // Stop visual cues for preparing sending input and show the form
    $scope.stopPrepareToSend = function (state) {
        // Show form, hide loader and stop animation
        $scope.showToggles.form = true;
        $scope.loaderScope.visible = false;
        $scope.loaderScope.animate = false;
        
        // Show visual cue for state
        $scope.showToggles[state] = true;
    };
      
    // Prepare error messages for display to the user
    $scope.handleErrors = function (serverError, errorData) {
        // Show errors
        $scope.stopPrepareToSend("error");

        // If it's an server error, we need to set some additional flags
        if (serverError) {
            $scope.errors.serviceError = true;
        }

        // If there's a 'data' attribute in the errorData, then it's likely a validation error from MongoDB
        // And we might need to parse the data attribute of it
        if (typeof errorData.data === "object") {
            $scope.errors.serviceMessages.validationError = true;
            
            var errorObjectKeys = Object.keys(errorData.data.errors);
            var errorMessages = [];
            for (var i = 0; i < errorObjectKeys.length; i++) {
                errorMessages.push(errorData.data.errors[errorObjectKeys[i]].message);
            }

            // Add the messages to the error object of the $scope
            $scope.errors.serviceMessages.serviceErrorMessage = errorMessages.toString();
        } else {
            // Service might be down
            $scope.errors.serviceMessages.serviceUnavailable = true;
            $scope.showToggles.form = false;
        }
    };
      
    // Reset the error object
    $scope.resetErrors = function () {
        // Hide errors
        $scope.showToggles.error = false;

        // Reset error settings
        $scope.errors = {
            missingParameters: false,
            wrongInput: false,
            wrongFields: [],
            serviceError: false,
            serviceMessages: {
                serviceUnavailable: false,
                serviceErrorMessage: "",
                validationError: false
            }
        };
    };
      
    // Reset statuses
    $scope.resetStatuses = function () {
        $scope.showToggles.status = false;

        $scope.status = {
            createSuccess: false,
            editSuccess: false,
            deleteSuccess: false
        };
    };
  });
