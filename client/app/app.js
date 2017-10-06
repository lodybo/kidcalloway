'use strict';
var rollbarProvider = null;

angular.module('kidCallowayApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngMessages',
  'ui.bootstrap',
  'tandibar/ng-rollbar'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    // $routeProvider
    //   .otherwise({
    //     redirectTo: '/'
    //   });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .factory("RollbarSettings", function ($http) {
    return $http.get("/api/settings/rollbarsettings");
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  })
  
  .config(function($sceDelegateProvider) {
    // Whitelist some important external resources, like YouTube!
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://www.youtube.com/**'
    ]);
  })
  
  .config(function (RollbarProvider) {
    rollbarProvider = RollbarProvider;
  })
  .run(function (RollbarSettings) {
    RollbarSettings.then(function (rollbarSettings) {
      if (rollbarSettings.data.environment === "test") {
        return;
      }

      rollbarProvider.init({
        accessToken: rollbarSettings.data.token,
        captureUncaught: true,
        captureUnhandledRejections: true,
        payload: {
          environment: rollbarSettings.data.environment
        }
      });

      rollbarProvider = null;
    });
  });