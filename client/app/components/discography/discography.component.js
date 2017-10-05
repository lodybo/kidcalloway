'use strict';

angular.module('kidCallowayApp')
  .component('discography', {
    templateUrl: 'app/components/discography/discography.component.html',
    bindings: {},
    controller: function (DiscographyService) {
      var ctrl = this;

      DiscographyService.get('II').then(function (album) {
        ctrl.album = album;
      });
    }
  });