'use strict';

angular.module('kidCallowayApp')
  .component('nextGig', {
    templateUrl: 'app/components/next-gig/next-gig.component.html',
    bindings: { },
    controller: ['$resource', function ($resource) {
      var ctrl = this;

      $resource('/api/agenda/next').get().$promise.then(function (nextGig) {
        ctrl.next = nextGig;
      });
    }]
  });