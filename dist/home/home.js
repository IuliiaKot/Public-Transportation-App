"use strict";angular.module("myApp.home",["ngRoute","firebase"]).config(["$routeProvider",function(e){e.when("/home",{templateUrl:"home/home.html",controller:"HomeCtrl"})}]).controller("HomeCtrl",["$scope","$location","CommonProp","$firebaseAuth",function(e,o,t,n){var a=new Firebase("https://event-manager-app.firebaseio.com/"),r=n(a),i={};e.login=i,e.user={},e.SignIn=function(n){n.preventDefault();var a=e.user.email,l=e.user.password;i.loading=!0,r.$authWithPassword({email:a,password:l}).then(function(e){console.log("Authentication successful"),i.loading=!1,t.setUser(e.password.email),o.path("/welcome")},function(e){i.loading=!1,console.log("Authentication failure")})}}]).directive("validateEmail",function(){var e=/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;return{require:"ngModel",restrict:"",link:function(o,t,n,a){a&&a.$validators.email&&(a.$validators.email=function(o){return a.$isEmpty(o)||e.test(o)})}}}).service("CommonProp",["$location","$firebaseAuth",function(e,o){var t="",n=new Firebase("https://event-manager-app.firebaseio.com/Events"),a=o(n);return{getUser:function(){return""===t&&(console.log(t),t=localStorage.getItem("userEmail")),t},setUser:function(e){localStorage.setItem("userEmail",e),t=e},logoutUser:function(){a.$unauth(),t="",localStorage.clear(),console.log("done logout"),e.path("/home")}}}]);