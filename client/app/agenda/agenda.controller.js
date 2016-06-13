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
        serviceError: false
    };
    
    $scope.formData = {
        id: null,
        date: new Date(),
        time: "20:00",
        venue: "Cafe De Kroeg",
        address: "Kroegseweg 12, Eindhoven",
        fbEvent: "http://www.facebook.com/",
        details: null,
        ticket: null
    };
    
    // Toggles for the loader icon, success result and error result and the order form
    $scope.showToggles = {
        loader: false,
        animateLoader: false,
        success: false,
        error: false,
        form: false
    };
    
    $scope.sortByDate = function (date) {
        var offTheJedi = new Date(date.date.raw);
        
        return offTheJedi; // Haha!
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
        }, function () {
            $scope.errors.serviceError = true;
        });
    };
    $scope.getAllGigs();
    
    // *** ADD OR EDIT GIGS
    $scope.editGig = function (gigID) {
        // Set the form state to edit
        $scope.formState.state = "edit";
        
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
        }, function () {
            $scope.errors.serviceError = true;
        });
    };
    $scope.deleteGig = function () {
        //debugger;
    };
    $scope.cancelGig = function () {
        //debugger;
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
            fbEvent: "http://www.facebook.com/",
            details: null,
            ticket: null
        };
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
        $scope.errors = {
            missingParameters: false,
            wrongInput: false,
            wrongFields: []
        };
        
        // First check if every required field has been entered
        Object.keys($scope.formData).forEach(function (key) {
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
        // Based on the value of the id parameter, we either need to create a new gig or edit an existing one
        if ($scope.formData.id === null) {
            // Edit an existing one
            AgendaService.editGig($scope.formData).then(function () {
                // Reset the edit state of the form
                $scope.reset();
                
                // Refresh gig list
                $scope.gigs = [];
                $scope.getAllGigs();
            }, function (errors) {
                $scope.errors = errors;
                $scope.stopPrepareToSend("error");
            });
            
            // Exit function
            return;
        }
        
        // No id, so we need to add a new one
        AgendaService.addGig($scope.formData).then(function() {
            $scope.stopPrepareToSend("success");
            // Let's get the new gig list
            $scope.gigs = [];
            $scope.getAllGigs();
        }, function (errors) {
            $scope.errors = errors;
            $scope.stopPrepareToSend("error");
        });
    };
    
    // Prepare visual cues while we're preparing to send form input
    $scope.prepareToSend = function () {
        // Hide form, show and animate loader
        $scope.showToggles.form = false;
        $scope.showToggles.loader = true;
        $scope.showToggles.animateLoader = true;
        
        // Hide visual cues for state
        $scope.showToggles.success = false;
        $scope.showToggles.error = false;
    };
    
    // Stop visual cues for preparing sending input and show the form
    $scope.stopPrepareToSend = function (state) {
        // Show form, hide loader and stop animation
        $scope.showToggles.form = true;
        $scope.showToggles.loader = false;
        $scope.showToggles.animateLoader = false;
        
        // Show visual cue for state
        $scope.showToggles[state] = true;
    };
  });
