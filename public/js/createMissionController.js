'use strict';

angular.module('myApp.controllers').controller('create_mission', function($scope, $http, $location){
	$('.ui .dropdown').dropdown({
		maxSelections: 5,
		allowAdditions: true
	});
});