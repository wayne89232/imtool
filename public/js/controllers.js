'use strict';

angular.module('myApp.controllers', ['ngRoute']).controller('AppCtrl', function ($rootScope, $window, $scope, $http, $location) {
	if($window.localStorage.getItem("is_login")){
		$scope.is_login = true;
		$scope.local_user = $window.localStorage.getItem("account");
		$scope.user_type = $window.localStorage.getItem("user_type");
		$scope.photo = $window.localStorage.getItem("photo");
	} 	

	$('.ui .dropdown').dropdown({
    	maxSelections: 5,
    	allowAdditions: true
  	});

    $('.datepicker').pickadate({
	});
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
            // $window.location.reload();
                        console.log(data)
        }
        else{
            alert("Fill in all entities!");
        }
    }
	$scope.login = function(){
		if($scope.account != null && $scope.password != null){
	            var data = {
	                account: $scope.account, 
	                password: $scope.password
	            };
		    $http({ 
		    	method:"POST", 
		    	url:'/login',
		    	data: data
		     }).then(function(result){
		     	var user = result.data.user;
				if(result.data.success==true){
					$window.localStorage.setItem("is_login", true);
					$window.localStorage.setItem("account", user.account);
					$window.localStorage.setItem("user_id", user.user_id);
					$window.localStorage.setItem("photo", user.photo_url);
					$window.location.reload();
					// console.log(user)
					
				}
				else{
					alert(result.data.msg);
					$window.location.reload();
				}
		    });	
		}
		else{
			alert("Invalid account or password");
		}
	}
	$scope.logout = function(){
		$http({ 
	    	method:"POST", 
	    	url:'/logout',
	     }).then(function(result){
			$window.localStorage.clear();
			$window.location.reload();
        	$location.path('/');
	    });	

	}
    $scope.user_info = function(){
    	$location.path('/user_info/'+$window.localStorage.getItem("user_id"));
    }	
}).controller('create_mission', function ($scope, $http, $location) {
	$('.ui .dropdown').dropdown({
    maxSelections: 5,
    allowAdditions: true
  });
}).controller('discover', function ($scope, $http, $location) {
}).controller('view_mission', function ($scope, $http, $location,$window,$routeParams) {
	var cur_user = $window.localStorage.getItem("user_id");

	$http({ method:"GET", url:'/viewEvent/' + $routeParams.id }).then(function(mission){
		$scope.mission_info = mission.data.data;
		$http({ method:"GET", url:'/find_tools/' + $scope.mission_info.mission_id }).then(function(tools){
			$scope.tools = tools.data.data;
			$scope.identity = function(){
				if (cur_user == $scope.mission_info.User.user_id) {
					return (true);
				}
				else{
					return( false );
				}
			}
		});
	});

	$('.progress').progress();
	$('.ui.rating').rating('enable');

	$scope.missionCleared = function(){
		$('.ui.small.modal').modal('show');
	}
}).controller('mission_list', function ($scope, $http, $location) {
	$http({ method:"GET", url:'/getMissions/' }).then(function(missions){
		$scope.missions = missions.data.data;
	});
	$scope.view_mission = function(id){
    	$location.path('/view_mission/'+id);
    }	
}).controller('user_info', function ($scope, $http, $location,$routeParams,$window) {
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


