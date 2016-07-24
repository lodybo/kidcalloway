'use strict';

angular.module('kidCallowayApp')
  .controller('HeroCtrl', function ($scope, SettingsService, $window, $timeout) {
    $scope.message = 'Hello';
    $scope.heroOptions = {
      videoURL: undefined,
      youTubeScriptLoaded: false,
      mobileVersionLoaded: false,
      mobile: true
    };

    $scope.loaderScope = {
      classes: "col-xs-1 col-sm-push-5 col-md-push-5",
      animate: true,
      visible: true
    };

    // Stop loader
    $scope.stopLoader = function () {
      $timeout(function() {
        $scope.loaderScope.animate = false;
        $scope.loaderScope.visible = false;
      });
    };

    // Check the page width: if it's larger than a medium sized screen (769px),
    // then we'll load the YouTube video.
    $scope.determineMedia = function () {
      if ($window.innerWidth < 768) {
        SettingsService.get("heroMobile").then(function(settingRaw) {
          // If image has not been loaded, do that
          if (!$scope.heroOptions.mobileVersionLoaded) {
            $scope.heroOptions.mobileVersionLoaded = true;
            var mobilePlayer = angular.element("#player-mobile");
            $scope.heroOptions.mobile = true;
            // This is a stringified object, so let's pase first
            var settingValue = JSON.parse(settingRaw.value);
            
            // Create an anchor
            var anchor = document.createElement("a");
            anchor.href = settingValue.linkTo;
            anchor.target = "_blank";

            // Create thumbnail
            var thumb = document.createElement("img");
            thumb.src = settingValue.image;
            thumb.className = "img-responsive";
            anchor.appendChild(thumb);

            // Add to player element
            mobilePlayer.append(anchor);
          }

          // Stop loader
          $scope.stopLoader();

          // Show image
          $scope.heroOptions.mobile = true;
        });
      } else {
        // Get the YT url for the header
        SettingsService.get("heroVideo").then(function(setting) {
          $scope.heroOptions.mobile = false;
          $scope.heroOptions.videoURL = setting.value;

          // Get the YouTube video ID by splitting the video URL by "/" and picking the last array item
          var splittedVideoURL = $scope.heroOptions.videoURL.split("/");
          $scope.heroOptions.videoID = splittedVideoURL[splittedVideoURL.length - 1];

          // 2. This code loads the IFrame Player API code asynchronously. Only if it hasn't already loaded
          if(!$scope.heroOptions.youTubeScriptLoaded) {
            $scope.heroOptions.youTubeScriptLoaded = true;
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          }

          // 3. This function creates an <iframe> (and YouTube player)
          //    after the API code downloads.
          var player;
          $window.onYouTubeIframeAPIReady = function() {
            player = new YT.Player("player", {
              height: '390',
              width: '640',
              videoId: "HXtCXE9jlbQ"
            });

            // Stop loader
            $scope.stopLoader();
          };
        });
      }
    };

    // Bind everything when everything has been loaded
    $timeout(function () {
      angular.element($window).on("resize", $scope.determineMedia);
      $scope.determineMedia();
    });
  });
