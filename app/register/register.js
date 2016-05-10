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

  $scope.EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i;

  var auth = $firebaseAuth(firebaseObj);
  $scope.signUp = function() {
      if (!$scope.regForm.$invalid) {
          var name = $scope.user.name;
          var email = $scope.user.email;
          var password = $scope.user.password;
          var jobTitle = $scope.user.jobTitle;
          if (email && password && name) {
              auth.$createUser(email, password)
                  .then(function(userData) {
                    localStorage.setItem("userName", name);
                    localStorage.setItem("jobTitle", jobTitle);

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
// .directive('validateEmail', function() {
//   return {
//     restrict: 'A',
//     require: 'ngModel',
//     link: function(scope, elm, attrs, model) {
//       //change this:
//       var EMAIL_REGEXP =  /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
//       var emailValidator = function(value) {
//       if (!value || EMAIL_REGEXP.test(value)) {
//         model.$setValidity('email', true);
//         return value;
//       } else {
//         model.$setValidity('email', false);
//         return undefined;
//       }
//       model.$parsers.push(emailValidator);
//       model.$formatters.push(emailValidator);
//     }
//   }
// }
// })

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
