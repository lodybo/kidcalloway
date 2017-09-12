'use strict';

angular.module('kidCallowayApp')
  .component('bio', {
    templateUrl: 'app/components/bio/bio.component.html',
    bindings: {
      size: '<'
    },
    controller: function () { }
  });