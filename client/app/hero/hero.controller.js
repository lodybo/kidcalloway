'use strict';

angular.module('kidCallowayApp')
  .controller('HeroCtrl', function ($scope, SettingsService, $window, $timeout) {
    $scope.message = 'Hello';
    $scope.heroOptions = {
      videoID: undefined,
      videoURL: undefined,
      videoIMG: undefined,
      youTubeScriptLoaded: false,
      mobileVersionLoaded: false,
      mobile: true
    };

    $scope.loaderScope = {
      classes: "col-xs-1 col-xs-push-5 col-sm-push-5 col-md-push-5",
      animate: true,
      visible: true
    };

    // Get the YouTube video ID
    SettingsService.get("heroYouTubeID").then(function (setting) {
      // Store the video ID
      $scope.heroOptions.videoID = setting.value;

      // Bind everything when everything has been loaded
      $timeout(function () {
        angular.element($window).on("resize", $scope.determineMedia);
        $scope.determineMedia();
      });
    });

    // Stop loader
    $scope.stopLoader = function () {
      $scope.loaderScope.animate = false;
      $scope.loaderScope.visible = false;
    };

    // Start loader
    $scope.startLoader = function () {
      $scope.loaderScope.animate = true;
      $scope.loaderScope.visible = true;
    };

    // Center play button
    $scope.centerPlayButton = function () {
      // Get reference to mobile player area and button
      var mobilePlayer = document.getElementById("player-mobile");
      var mobilePlayerButton = document.getElementById("player-mobile-play-button");

      // Position play button in the center
      var mpHeightHalf = mobilePlayer.clientHeight / 2;
      var mpWidthHalf = mobilePlayer.clientWidth / 2;

      var btnHeightHalf = mobilePlayerButton.clientHeight / 2;
      var btnWidthHalf = mobilePlayerButton.clientWidth / 2;

      mobilePlayerButton.style.top = (mpHeightHalf - btnHeightHalf).toString() + "px";
      mobilePlayerButton.style.left = (mpWidthHalf - btnWidthHalf).toString() + "px";

      if (mobilePlayerButton.style.visibility === "hidden") {
        mobilePlayerButton.style.visibility = "visible";
      }
    };

    // Check the page width: if it's larger than a medium sized screen (769px),
    // then we'll load the YouTube video.
    $scope.determineMedia = function () {
      if ($window.innerWidth < 768) {
        if (!$scope.heroOptions.mobileVersionLoaded) {
          $scope.heroOptions.mobileVersionLoaded = true;
          // We have the videoID, so we can construct a YouTube video and image url from that.
          $scope.heroOptions.videoURL = "https://www.youtube.com/watch?v=" + $scope.heroOptions.videoID;
          $scope.heroOptions.videoIMG = "https://img.youtube.com/vi/" + $scope.heroOptions.videoID + "/0.jpg";

          // Get reference to mobile player area and button
          var mobilePlayer = document.getElementById("player-mobile");

          // Create an anchor
          var anchor = document.createElement("a");
          anchor.href = $scope.heroOptions.videoURL;
          anchor.target = "_blank";

          // Create thumbnail
          var thumb = document.createElement("img");
          thumb.src = $scope.heroOptions.videoIMG;
          thumb.className = "img-responsive player-mobile-image";
          anchor.appendChild(thumb);

          // Add to player element
          mobilePlayer.appendChild(anchor);

          // Check if the image has loaded, then assign the center method
          // And assign it to the window's resize event
          if (thumb.complete) {
            $scope.centerPlayButton();
            angular.element($window).on("resize", $scope.centerPlayButton);
          } else {
            thumb.addEventListener('load', $scope.centerPlayButton);
            angular.element($window).on("resize", $scope.centerPlayButton);
          }
        }

        // Stop loader
        $scope.stopLoader();

        // Show image
        $scope.heroOptions.mobile = true;
      } else {
        // Hide mobile image
        $scope.heroOptions.mobile = false;

        // 2. This code loads the IFrame Player API code asynchronously. Only if it hasn't already loaded
        if(!$scope.heroOptions.youTubeScriptLoaded) {
          // We can construct the embed link from the YouTube video ID too
          $scope.heroOptions.videoURL = "https://www.youtube.com/embed/" + $scope.heroOptions.videoID;

          // Show loader momentarily
          $scope.startLoader();

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
            videoId: $scope.heroOptions.videoID
          });

          // Stop loader
          $scope.stopLoader();
        };
      }
    };
  });
