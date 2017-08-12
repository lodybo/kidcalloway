'use strict';

angular.module('kidCallowayApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $window, $timeout) {
    $scope.menu = [{
      'title': 'Live',
      'link': '!#live',
      'restriction': 'all',
      'icon': 'music',
    }, {
      'title': 'Birth',
      'link': '!#birth',
      'restriction': 'all',
      'icon': 'mars',
    }, {
      'title': 'Experience',
      'link': '!#experience',
      'restriction': 'all',
      'icon': 'play',
    }, {
      'title': 'Contact',
      'link': '!#contact',
      'restriction': 'all',
      'icon': 'envelope',
    }, {
      'title': 'Agenda',
      'link': '/agenda',
      'restriction': 'loggedIn',
      'icon': 'calendar',
    }, {
      'title': 'Reviews',
      'link': '/reviews',
      'restriction': 'loggedIn',
      'icon': 'commenting',
    }, {
      'title': 'Site settings',
      'link': '/site-settings',
      'restriction': 'admin',
      'icon': 'cogs',
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

    // STICKY MENU

    $window.onscroll = function () {
      // We want the menu to show after the user has scrolled past the logo
      // So we need to know the position and height of the logo, the current scroll position and whether we've passed the threshold with the logo
      var logo = {
        el: $(".kidc-logo"),
      };
      logo.top = logo.el.position().top;
      logo.height = logo.el.height();
      logo.threshold = logo.top + logo.height;
      
      // Get the current scroll position
      var currentScrollPosition = $window.pageYOffset;
      
      // Get the navbar
      var navbar = $(".navbar.navbar-fixed-top");
      
      // Check if we've passed the threshold in our current scroll position
      if (currentScrollPosition > logo.threshold) {
        navbar.css("opacity", "1");
      } else {
        navbar.css("opacity", "0");
      }
      
      // var distance = $scope.getDistance() - $window.pageYOffset;
      // var offset = $window.pageYOffset;
      // var elHeight = sticky.el.height();
      // var offsetHeightDiff = elHeight - offset;
      // if (offsetHeightDiff < offset) {
      //   sticky.el.css("opacity", "1");
      // } else {
      //   sticky.el.css("opacity", "0");
      // }
    };
  });
