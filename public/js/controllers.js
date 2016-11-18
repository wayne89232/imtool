'use strict';

angular.module('myApp.controllers', ['ngRoute']).controller('AppCtrl', function ($scope, $http, $location) {
	// $('.basic.modal').modal('attach events', '.minimal.button');

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
});
