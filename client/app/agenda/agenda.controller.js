'use strict';

angular.module('kidCallowayApp')
  .controller('AgendaCtrl', function ($scope, AgendaService, Auth) {
    // *** SETUP
    // Collections for the gig list and error list
    $scope.gigs = [];
    $scope.errors = [];
    
    // Show the editing form
    $scope.showForm = true;
    
    // State of the editing form: new or edit.
    // Caption of the submit button adjusts to this state
    $scope.formState = "new";
    $scope.submitButtonCaption = "Gig toevoegen aan agenda";
    
    // Pass the isLoggedIn function from the Auth service to the view
    $scope.isLoggedIn = Auth.isLoggedIn;
    
    // *** GENERAL
    // Retrieve the data of all the gigs from the service
    $scope.getAllGigs = function () {
        AgendaService.get().then(function (gigs) {
            $scope.gigs = gigs;
        }, function (errors) {
            $scope.errors = errors;
        });
    };
    $scope.getAllGigs();
    
    
  });
