'use strict';

angular.module('kidCallowayApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, Rollbar) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function () {
      // No signup possible, register error to Rollbar
      Rollbar.error("Illegal signup attempted", $scope.user);

      // Redirect to home
      $location.path("/");
    };

    /*$scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };*/

  });
