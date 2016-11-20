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
		$('.ui.basic.modal').modal('show');
	}
}).controller('create_mission', function ($scope, $http, $location) {
	$('.ui .dropdown').dropdown({
    maxSelections: 5,
    allowAdditions: true
  });
}).controller('discover', function ($scope, $http, $location) {
}).controller('mission_list', function ($scope, $http, $location) {
}).controller('rank_list', function ($scope, $http, $location) {
	$('.ui.rating').rating('disable');
	$('.sortable.table').tablesort();
	$('.tabular.menu .item').tab();
}).controller('testPopup', function ($scope, $http, $location) {
	$scope.missionCleared = function(){
		$('.ui.small.modal').modal('show');
	}
	$('.ui.rating').rating('enable');
});


