'use strict';



if (navigator.serviceWorker){
  // debugger
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
    // Set defualt view of our app to home

    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);
