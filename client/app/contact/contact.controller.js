'use strict';

angular.module('kidCallowayApp')
  .controller('ContactCtrl', function ($scope) {
    $scope.contactDetails = {
      phone: "tel:+31 (0)6 15 07 04 08",
      mail: "mailto:info@kidcalloway.nl"
    };

    $scope.changeContactDetails = function ($event, detail) {
      debugger;
      var elem = angular.element($event.currentTarget);
      elem.attr("href", $scope.contactDetails[detail]);
    };
  });
