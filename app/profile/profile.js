'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/profile', {
        templateUrl: 'profile/profile.html',
        controller: 'ProfileCtrl'
    });
}])

.controller('ProfileCtrl', ['$scope','$firebase','CommonProp', function($scope,$firebase,CommonProp) {
  $scope.name = localStorage.getItem('userName');
  $scope.jobTitle = localStorage.getItem('jobTitle');
  $scope.userEmail = localStorage.getItem('userEmail');

  if(!CommonProp.getUser()){
    $location.path('/home');
  }
  var login = {};
  $scope.login = login;

  $scope.logout = function(){
    CommonProp.logoutUser();

  };
  var user = CommonProp.getUser();

}]);
