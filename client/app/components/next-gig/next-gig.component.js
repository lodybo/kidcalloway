'use strict';

angular.module('kidCallowayApp')
  .component('nextGig', {
    templateUrl: 'app/components/next-gig/next-gig.component.html',
    bindings: { },
    controller: ['AgendaService', function (AgendaService) {
      var ctrl = this;

      AgendaService.next().then(function (gig) {
        ctrl.gig = gig;
      });
    }]
  });