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
  var usersRef = new Firebase("https://event-manager-app.firebaseio.com/users");

  var auth = $firebaseAuth(firebaseObj);
  $scope.signUp = function() {
      if (!$scope.regForm.$invalid) {
          var name = $scope.user.name
          var email = $scope.user.email;
          var password = $scope.user.password;
          var jobTitle = $scope.user.jobTitle;
          if (email && password && name) {
              auth.$createUser(email, password)
                  .then(function(userData) {
                    localStorage.setItem("userName", name);
                    localStorage.setItem("jobTitle", jobTitle);
                    // localStorage.setItem("employee",)
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
.directive('validateEmail', function() {
  // ng-pattern doesn't work appropriatly.
  var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return {
    require: 'ngModel',
    restrict: '',
    link: function(scope, elm, attrs, ctrl) {
      if (ctrl && ctrl.$validators.email) {
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
});
