'use strict';

angular.module('myApp.register', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', ['$scope','$location','$firebaseAuth', function($scope,$location,$firebaseAuth) {
 	$scope.mesg = 'Hello';
 	var firebaseObj = new Firebase("https://event-manager-app.firebaseio.com/");
  var auth = $firebaseAuth(firebaseObj);
  $scope.signUp = function() {
      if (!$scope.regForm.$invalid) {
          var email = $scope.user.email;
          var password = $scope.user.password;
          var password_c = $scope.user.password_c;
          if (email && password  && password_c) {
              auth.$createUser(email, password)
                  .then(function() {
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
}])
.directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.regForm.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
})
