'use strict';

angular.module('kidCallowayApp')
  .controller('AgendaCtrl', function ($scope, AgendaService) {
    $scope.gigs = [];
    $scope.errors = [];
    $scope.showForm = true;
    $scope.submitButtonCaption = "Gig toevoegen aan agenda";
    
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
