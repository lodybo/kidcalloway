'use strict';

angular.module('kidCallowayApp')
  .component('discography', {
    templateUrl: 'app/components/discography/discography.component.html',
    bindings: {
      albumName: '@'
    },
    controller: function (DiscographyService) {
      var ctrl = this;

      this.$onInit = function () {
        DiscographyService.get(this.albumName).then(function (album) {
          ctrl.album = album;
        });
      };
    }
  });