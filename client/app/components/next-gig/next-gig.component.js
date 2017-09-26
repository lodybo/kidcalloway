'use strict';

angular.module('kidCallowayApp')
  .component('nextGig', {
    templateUrl: 'app/components/next-gig/next-gig.component.html',
    bindings: { },
    controller: ['$resource', function ($resource) {
      var ctrl = this;

      $resource('/api/agenda/next').get(function (nextGig) {
        var result = nextGig.toJSON();

        if (!result.message) {
          ctrl.gig = result;
        }
      });
    }]
  });