'use strict';

angular.module('myApp.controllers', ['ngRoute']).controller('AppCtrl', function ($rootScope, $window, $scope, $http, $location) {
	$('.ui .dropdown').dropdown({
    maxSelections: 5,
    allowAdditions: true
  });
	$('.datepicker').pickadate();
	$scope.jump_login = function(){
		$('.ui.modal.login').modal('show');
	}
	$scope.create_mission = function(){
		$('.ui.modal.mission').modal('show');
	}	
	$scope.jump_register = function(){
		$('.ui.modal').modal('hide');
	}
    $scope.add_mission = function(){
    	if($scope.title != null ){
            var data = {
            	user_id: "window storage",
            	location: "if not started with id segment, create new",
                title: $scope.title, 
                recruit_time: new Date(),
                skills: $scope.skills,
                start_time: $scope.start_time,
                expire_time: $scope.expire_time,
                content: $scope.content,
                state: "Recruiting"
            };
            // $http({
            //     method: "POST", 
            //     url: '/mission/create_mission', 
            //     data: data
            // }).then(function(result){
            // 	$window.location.reload();
            // 	// $location.path("/mission");
            // });
            console.log(data)
            $window.location.reload;
        }
        else{
            alert("Fill in all entities!");
        }
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

}).controller('register_page', function ($scope, $http, $location) {
	$('.ui .dropdown').dropdown({
    maxSelections: 5,
    allowAdditions: true
  });
});


