'use strict';

angular.module('myApp.controllers').controller('view_mission', function($scope, $http, $location,$window,$routeParams){
	var cur_user = $window.localStorage.getItem("user_id");

	$http({ method:"GET", url:'/viewEvent/' + $routeParams.id }).then(function(mission){
		$scope.mission_info = mission.data.data;
		$http({ method:"GET", url:'/find_tools/' + $scope.mission_info.mission_id }).then(function(tools){
			$http({ method:"GET", url:'/user_list/' }).then(function(users){
				$http({ method:"GET", url:'/mission_skills/' + $scope.mission_info.mission_id }).then(function(skills){
					$scope.tools = tools.data.data;
					$scope.toolmans = users.data.data;
					$scope.toolmans = _.reject($scope.toolmans,function(toolman){
						return _.contains(_.pluck($scope.tools,"user_id").concat(cur_user),toolman.user_id);
					});
					$scope.skills = skills.data.data;
					$scope.delete = false;
					$scope.firing = "";
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
	$scope.add_toolman = function(){
		var data = {
            user_id: $scope.new_tool.user_id,
            mission_id: $routeParams.id
        };
		$http({ 
		    	method:"POST", 
		    	url:'/get_tooled',
		    	data: data
		}).then(function(result){
				$window.location.reload();
		});	
	}
    $scope.user_info = function(id){
    	$location.path('/user_info/'+id);
    }	
    $scope.fire = function(){
    	$scope.delete = !$scope.delete;
    }
    $scope.fire_tool = function(id){
    	$scope.firing = id;
    	$('.ui.basic.modal.fire').modal('show');
    }
    $scope.go_fire = function(){
		$http({ 
		    	method:"POST", 
		    	url:'/fire_tool',
		    	data: {toolship_id: $scope.firing}
		}).then(function(result){
			$window.location.reload();
		});	
    }
});