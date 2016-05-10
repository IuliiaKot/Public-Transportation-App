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

  $scope.EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i;

  var uniqEmail = localStorage.getItem('email');

  var auth = $firebaseAuth(firebaseObj);

  $scope.emailCheck = function () {
        if (localStorage.getItem('email').includes($scope.user.email)) {
          $scope.message = "The specified email address is already in use.";
        }
        else
        {
          $scope.message = "";
        }
    }

  $scope.signUp = function() {
      if (!$scope.regForm.$invalid) {
          var name = $scope.user.name;
          var email = $scope.user.email;
          var password = $scope.user.password;
          var jobTitle = $scope.user.jobTitle;
          var values;
          if (email && password && name) {
              auth.$createUser(email, password)
                  .then(function(userData) {
                    localStorage.setItem("userName", name);
                    localStorage.setItem("jobTitle", jobTitle);
                    if (localStorage.getItem('email') === null)
                    {
                      localStorage.setItem('email', email)
                    }
                    else {
                      values = localStorage.getItem('email');
                      localStorage.setItem('email', values.concat(",",email));
                    }

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

.directive('autofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  }
}]);
