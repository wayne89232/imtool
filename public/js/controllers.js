'use strict';

angular.module('myApp.controllers', ['ngRoute']).controller('AppCtrl', function ($rootScope, $window, $scope, $http, $location) {

	// // change language, left to milestone 2
	// $rootScope.$watch('lang',function(newValue, oldValue){   

 //      if(newValue!=oldValue){
 //        localStorage.setItem("lang", newValue);
 //        $http({
 //        	method:"POST", url:'/api/setLocale', 
 //        	data:{ locale: newValue }
 //        }).success(function(result){
 //          location.reload();
 //        });
 //      } 
 //    });

	$scope.jump_login = function(){
		$('.ui.modal').modal('show');
	}
	$scope.jump_register = function(){
		$('.ui.modal').modal('hide');
	}
}).controller('create_mission', function ($scope, $http, $location) {
	$('.ui .dropdown').dropdown({
    maxSelections: 5,
    allowAdditions: true
  });
}).controller('discover', function ($scope, $http, $location) {
}).controller('mission_list', function ($scope, $http, $location) {
}).controller('register_page', function ($scope, $http, $location) {
	$('.ui .dropdown').dropdown({
    maxSelections: 5,
    allowAdditions: true
  });
});
