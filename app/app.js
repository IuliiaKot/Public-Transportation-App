'use strict';

if (navigator.serviceWorker){
  navigator.serviceWorker.register('./sw.js').then(function(e){
    console.log('registration worked');
  }).catch(function(){
    console.log('registration failed');
  })
}


angular.module('transitApp', [
    'ngRoute',
    'transitApp.home'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);
