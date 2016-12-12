'use strict';

angular.module('myApp.controllers').controller('view_mission', function($scope, $http, $location,$window,$routeParams){
	var cur_user = $window.localStorage.getItem("user_id");
	$http({ method:"GET", url:'/viewEvent/' + $routeParams.id }).then(function(mission){
		$scope.mission_info = mission.data.data;
		$http({ method:"GET", url:'/find_tools/' + $scope.mission_info.mission_id }).then(function(tools){
			$http({ method:"GET", url:'/user_list/' }).then(function(users){
				$http({ method:"GET", url:'/mission_skills/' + $scope.mission_info.mission_id }).then(function(skills){
					$scope.toolmans = users.data.data;
					$scope.tools = tools.data.data;
					$scope.skills = skills.data.data;
					$scope.identity = function(){
						if (cur_user == $scope.mission_info.User.user_id) {
							return true;
						}
						else{
							return false;
						}
					}
					$('.ui .dropdown').dropdown();
				});
			});
		});
	});

	$('.progress').progress();
	$('.ui.rating').rating('enable');
	

	$scope.missionCleared = function(){
		$('.ui.small.modal.mission_clear').modal('show');
	}
	$scope.add_tool = function(){
		$('.ui.small.modal.add_tool').modal('show');
	}
    $scope.user_info = function(id){
    	$location.path('/user_info/'+id);
    }	
});