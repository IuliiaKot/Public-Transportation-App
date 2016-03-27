'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])

.controller('WelcomeCtrl', ['$scope','$firebase','CommonProp', function($scope,$firebase,CommonProp) {
  $scope.username = CommonProp.getUser();
  console.log($scope.username)
  if(!$scope.username){
    $location.path('/home');
  }

  var firebaseObj = new Firebase("https://event-manager-app.firebaseio.com/Events");
  var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));

  $scope.events = sync.$asArray();
  $scope.logout = function(){
    CommonProp.logoutUser();
  }


}]);
