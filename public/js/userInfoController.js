'use strict';

angular.module('myApp.controllers').controller('user_info', function($scope, $http, $location,$routeParams,$window){
	$http({ method:"GET", url:'/getUserInfo/' + $routeParams.id }).then(function(user_info){
		$http({ method:"GET", url:'/getUserSkill/' + $routeParams.id }).then(function(skills){
			$http({ method:"GET", url:'/getUserMission/' + $routeParams.id }).then(function(mission1){
				$http({ method:"GET", url:'/getToolMission/' + $routeParams.id }).then(function(mission2){
					$scope.skill_list = skills.data.data;
					$scope.user_info = user_info.data.data;
					$scope.user_mission = mission1.data.data;
					$scope.tool_mission = mission2.data.data;
				});
			});
		});
    });
    if($routeParams.id==$window.localStorage.getItem("user_id")){
    	$scope.is_user=false;
    }
    else{
    	$scope.is_user=true;
    }
    $scope.view_mission = function(id){
    	$location.path('/view_mission/'+id);
    }
});