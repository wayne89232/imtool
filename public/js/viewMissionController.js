'use strict';

angular.module('myApp.controllers').controller('view_mission', function($scope, $http, $location,$window,$routeParams,$timeout,$rootScope){
	var cur_user = $window.localStorage.getItem("user_id");

	$http({ method:"GET", url:'/viewEvent/' + $routeParams.id }).then(function(mission){
		$scope.mission_info = mission.data.data;
		$http({ method:"GET", url:'/find_tools/' + $scope.mission_info.mission_id }).then(function(tools){
			$http({ method:"GET", url:'/user_list/' }).then(function(users){
				$http({ method:"GET", url:'/mission_skills/' + $scope.mission_info.mission_id }).then(function(skills){
					$http({ method:"GET", url:'/get_mission_chat/'+ $routeParams.id }).then(function(chat){
					$scope.tools = tools.data.data;
					$scope.toolmans = users.data.data;
					$scope.toolmans = _.reject($scope.toolmans,function(toolman){
						return _.contains(_.pluck($scope.tools,"user_id").concat(cur_user),toolman.user_id);
					});
					$scope.skills = skills.data.data;
					$scope.delete = false;
					$scope.firing = "";
					$scope.chats = chat.data.data;
					$scope.identity = function(){
						if (cur_user == $scope.mission_info.User.user_id) {
							return true;
						}
						else{
							return false;
						}
					};
					$scope.status = function(){
						if ($scope.mission_info.state != "Recruiting") {
							return false;
						}
						else if(_.contains(_.pluck($scope.tools,"user_id"),cur_user)){
							return false;
						}
						else{
							return true;
						}
					};
					$scope.done = function(){
						if ($scope.mission_info.state == "Done") {
							return true;
						}
						else{
							return false;
						}
					};
					$('.ui .dropdown').dropdown();
					});	
				});
			});
		});
	});

	$('.progress').progress();
	$('.ui.rating').rating('enable');
	$scope.glued = true

	
	$scope.testClick = function(index){
		console.log("HI", index)
		var currentValue = $('#'+index).rating('get rating');
		$scope.tools[index].rating = currentValue;

	}
	$scope.missionCleared = function(){
		$('.ui.small.modal.mission_clear').modal('show');
	}
	$scope.saveComment = function(){
		$('.ui.small.modal.mission_clear').modal('hide');
		console.log($scope.tools)
		$scope.end_mission_confirm()

	}

	//for tool more
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

	//for tool me
	$scope.tool_me = function(){
		$('.ui.basic.modal.tool_me').modal('show');
	}
	$scope.tool_me_go = function(){
		var data = {
            user_id: cur_user,
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

    $scope.stop_recruit = function(){
    	$('.ui.basic.modal.recruit').modal('show');
    }
    $scope.stop_recruit_confirm = function(){

		$http({ 
		    	method:"GET", 
		    	url:'/stop_recruit/'+$routeParams.id
		}).then(function(result){
			$window.location.reload();
		});	
    }


    $scope.end_mission = function(){
    	$('.ui.small.modal.mission_clear').modal('show');
		$('.ui.rating').rating('enable');

    }
    $scope.end_mission_confirm = function(){
		$http({ 
	    	method:"POST", 
	    	url:'/end_mission/'+$routeParams.id,
	    	data: $scope.tools
		}).then(function(result){
			$window.location.reload();
			// console.log(result)
		});	
    }
    var counter = 0
	function addItem(){
		var newMessage = new Object()
		newMessage.user = 123;
		newMessage.message = ++counter;
		$scope.messages.push(newMessage)
		$timeout(addItem, 10000);
	}
             
	// $timeout(addItem, 10000);



    $scope.sendMessage = function(){
    	var name = $window.localStorage.getItem("name");
    	var time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');;
    	var new_message = {
    		User:{
    			user_name: name
    		},
    		content: $scope.liveMessage,
    		time: time
    	}
    	
    	$http({ 
	    	method:"POST", 
	    	url:'/save_chat',
	    	data: {
	    		user_id: cur_user,
	    		mission_id: $routeParams.id,
	    		content: $scope.liveMessage
	    	}
		}).then(function(result){
			$scope.liveMessage = "";
        	$rootScope.socket.emit('add message',new_message)
		});	
    }
    $rootScope.socket.on('add message',function(data){
    	$scope.$apply(function(){
    		$scope.chats.push(data);
    	})
        
    });
});