'use strict';

angular.module('myApp.controllers', ['ngRoute','ngFileUpload','luegg.directives','base64']).controller('AppCtrl', function ($rootScope, $window, $scope, $http, $location) {
	if($window.localStorage.getItem("is_login")){
		$scope.is_login = true;
		$scope.local_user = $window.localStorage.getItem("account");
		$scope.user_type = $window.localStorage.getItem("user_type");
		$scope.photo = $window.localStorage.getItem("photo");
		$scope.local_user_name = $window.localStorage.getItem("name");
	} 	

	
	$rootScope.socket = io();

	// copy this line whenever u need to notify others
	// $rootScope.socket.emit('send notify',{})


	//pop out notification
    $rootScope.socket.on('got notification',function(data){
		$('.nag').nag('show');
    });

	$http({ method:"GET", url:'/skill_list/' }).then(function(skills){
		$scope.skill_list = skills.data.data;
		$window.localStorage.setItem("skill_list", JSON.stringify($scope.skill_list));

		//initialize ui components
		$('.ui .dropdown').dropdown({
	    	allowAdditions: true
	  	});
		$('.datepicker').pickadate({});

		$rootScope.$on('$routeChangeStart', function (next, last) {
	   		$('.ui.modal').modal('hide');
		});
		$('.ui.sticky').sticky({
	    	context: '#stick'
	  	});
	});
	$scope.jump_login = function(){
		$('.ui.modal.login2').modal('show');
	}
	$scope.show_menu = function(){
		$('.ui.basic.modal.menu').modal('show');
	}
	$scope.create_mission = function(){
		$('.ui.modal.mission').modal('show');
	}
	$scope.view_notifications = function(){
		$('.ui.modal.notification').modal('show');
	}
    $scope.add_mission = function(){
    	if($scope.title != null ){
            var data = {
            	user_id: $window.localStorage.getItem("user_id"),
            	location: $scope.location,
                title: $scope.title, 
                recruit_time: new Date(),
                skills: $scope.skills,
                start_time: $scope.start_time,
                expire_time: $scope.expire_time,
                content: $scope.content,
                state: "Recruiting"
            };
            $http({
				method: "POST", 
				url: '/createMission',
				data: $.param(data),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'} 
			}).then(function(result){
				$window.location.reload();
				// console.log(result)
            });
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
					$window.localStorage.setItem("name", user.user_name);
					$window.location.reload();
					
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
    	if($window.localStorage.getItem("is_login")){
    		$location.path('/user_info/'+$window.localStorage.getItem("user_id"));
    	}
    	else{
    		$scope.jump_login();
    	}
    }
}).controller('mission_list', function ($scope, $http, $location) {

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
}).controller('mission_list', function ($scope, $http, $location) {
	$http({ method:"GET", url:'/getMissions/' }).then(function(missions){
		$scope.missions = missions.data.data;
		$scope.missions = _.reject($scope.missions,function(mission){
			return mission.state!="Recruiting";
		});
	});
	$scope.view_mission = function(id){
    	$location.path('/view_mission/'+id);
    }	
}).controller('testPopup', function ($scope, $http, $location) {
	$scope.missionCleared = function(){
		$('.ui.small.modal').modal('show');
	}
	$('.ui.rating').rating('enable');

})

