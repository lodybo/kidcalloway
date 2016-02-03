'use strict';

angular.module('kidCallowayApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Live',
      'link': '#live',
      'restriction': 'all',
      'icon': 'music'
    }, {
      'title': 'Birth',
      'link': '#birth',
      'restriction': 'all',
      'icon': 'mars'
    }, {
      'title': 'Experience',
      'link': '#experience',
      'restriction': 'all',
      'icon': 'play'
    }, {
      'title': 'Contact',
      'link': '#contact',
      'restriction': 'all',
      'icon': 'envelope'
    }, {
      'title': 'Agenda',
      'link': '/agenda',
      'restriction': 'loggedIn'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.checkRestriction = Auth.checkRestriction;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
