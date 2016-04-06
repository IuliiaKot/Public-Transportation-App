'use strict';

angular.module('myApp.addEvent', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addEvent', {
        templateUrl: 'addEvent/addEvent.html',
        controller: 'AddEventCtrl'
    });
}])

.controller('AddEventCtrl', ['$scope', '$firebase', '$location', 'CommonProp', function($scope, $firebase, $location, CommonProp) {

  if(!CommonProp.getUser()){
    $location.path('/home')
  }
  var login = {};
  $scope.login = login;

  $scope.logout = function(){
    CommonProp.logoutUser();
  }

  $scope.AddEvent = function(){

    var name = $scope.event.name;
    var type = $scope.event.type;
    var host = $scope.event.host;
    var startdatetime = $scope.event.startdatetime.toString();
    var enddatetime = $scope.event.enddatetime.toString();
    var guests = $scope.event.guests;
    var location = $scope.event.location;
    var message = $scope.event.message;
    console.log(startdatetime);

    var firebaseObj = new Firebase("https://event-manager-app.firebaseio.com/Events");
    var fb = $firebase(firebaseObj);

    var user = CommonProp.getUser();

    fb.$push({name: name,
            type: type,
            host: host,
            startdatetime: startdatetime,
            enddatetime: enddatetime,
            guests: guests,
            location: location,
            message: message ? message : "",
            emailID: CommonProp.getUser(),
            '.priority': user
          }).then(function(ref) {
            console.log(ref);
            $location.path('/welcome');
          }, function(error){
            console.log("error:", error)
          });
    }
}]);
