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
  $scope.name = localStorage.getItem('userName');
  $scope.jobTitle = localStorage.getItem('jobTitle');
  $scope.email = localStorage.getItem('email');
  console.log(localStorage);
  console.log($scope.username);
  console.log($scope.username)
  if(!$scope.username){
    $location.path('/home');
  }

  var firebaseObj = new Firebase("https://event-manager-app.firebaseio.com/Events");
  var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));

  $scope.events = sync.$asArray();
  $scope.logout = function(){
    CommonProp.logoutUser();
  };

}]);


// {
//   "rules": {
//     "users": {
//       "$uid": {
//         // grants write access to the owner of this user account whose uid must exactly match the key ($uid)
//         ".write": "auth !== null && auth.uid === $uid",
//
//         // grants read access to any user who is logged in with an email and password
//         ".read": "auth !== null && auth.provider === 'password'"
//       }
//     }
//   }
// }
