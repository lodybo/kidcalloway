'use strict';

angular.module('kidCallowayApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $window, $timeout) {
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

    // Check the window (inner)width and see if we're over our CSS border of 550px
    $scope.overWindowBorder = false;
    $scope.checkWindowBorder = function () {
      $timeout(function () {
        if ($window.innerWidth > 549) {
          $scope.overWindowBorder = true;
        } else {
          $scope.overWindowBorder = false;
        }
      });
    };
    $scope.checkWindowBorder();

    $(window).on("resize.doResize", function (){
      $scope.checkWindowBorder();
    });

    // When we destroy our scope, we need to remove this listener otherwise we'll get a lot of issues.
    $scope.$on("$destroy",function (){
      $(window).off("resize.doResize"); //remove the handler added earlier
    });

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
