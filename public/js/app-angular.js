var app = angular.module("RapBoard", ['ngResource']);

function RapperCtrl($scope, $http){
  $http({method: 'GET', url: '/data/rappers.json'}).
    success(function(data, status, headers, config) {
      $scope.rappers = data;
      $scope.playAudio = function(className) {
        console.log(className)
        var audio = document.getElementById("audio-"+className);
        audio.play();
      }
    }).
    error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });
}