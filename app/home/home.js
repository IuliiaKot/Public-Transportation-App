'use strict';

angular.module('transitApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','$http',function($scope,$http) {
  $scope.name = "julia";

  function getStations(){
    return new Promise(function(resolve, reject){
      $http.get('../data/stations.json').success(function(data){
        resolve(data)
      });
    });
  };


    getStations().then(function(data){
      console.log(data[0]['Station Name'])
      $scope.stations = data;
      $scope.$apply();
  })


  function get(url) {
      return new Promise(function(resolve, reject) {
        $.getJSON(url)
          .done(function(json){
            resolve(json)
          })
          .fail(function(xhr, status, err){
            reject(status + err.message);
          })
      })
    }

    $scope.findStops = function(){
      // from station

      var req1 = $scope.stationsValue1['Station Name'];
      // to station
      var req2 = $scope.stationsValue2['Station Name']
      get('http://www3.septa.org/hackathon/NextToArrive/?req1='+req1+'&req2='+req2+'&req3=5&callback=?')
        .then(function(result){
          if (result.length != 0) {
            $scope.message = '';
            $scope.header = ['Train#', 'Line', 'Departs', 'Arrives', 'Connect At', 'Status'];
            $scope.allStops = result;
            $scope.from = req1;
            $scope.to = req2;
            console.log(result)
          }
          else {
            $scope.allStops = ""
            $scope.from = ""
            $scope.to = ""
            $scope.message = "There are not trains between this stations";
          }
          $scope.$apply();
        })
    }

}])
