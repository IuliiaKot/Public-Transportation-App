'use strict';

angular.module('myApp.register', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', ['$scope','$location','$firebaseAuth',function($scope,$location,$firebaseAuth) {
 	$scope.mesg = 'Hello';
 	var firebaseObj = new Firebase("https://event-manager-app.firebaseio.com/");
  var auth = $firebaseAuth(firebaseObj);
  $scope.signUp = function() {
      if (!$scope.regForm.$invalid) {
          var name = $scope.user.name
          var email = $scope.user.email;
          var password = $scope.user.password;
          if (email && password && name) {
              auth.$createUser(email, password)
                  .then(function(userData) {
                    localStorage.setItem("userName", name);
                      console.log('User creation success');
                      $location.path('/home');
                  }, function(error) {
                      console.log(error);
                      $scope.regError = true;
                      $scope.regErrorMessage = error.message;
                  });
          }
      }
  };
}]);
