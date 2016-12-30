'use strict';

angular.module('myApp.controllers').controller('community', function($scope, $http, $location){
	$http({ method:"GET", url:'/list_community/' }).then(function(communities){
		$scope.communities = communities.data.data;

	});
	$scope.view_community = function(id){
    	$location.path('/view_community/'+id);
    }	
}).controller('view_community', function($scope, $http, $location){
	var cur_user = $window.localStorage.getItem("user_id");		
	$http({ method:"GET", url:'/viewCommunity/' + $routeParams.id }).then(function(community){
		$scope.community_info = community.data.data;
		$http({ method:"GET", url:'/get_community_member/' + $scope.community_info.community_id }).then(function(members){
			$http({ method:"GET", url:'/get_community_chat/' + $scope.community_info.community_id }).then(function(chatlogs){
				$scope.members = members.data.data;
				$scope.chatlogs = chatlogs.data.data;

			});
		});
	});
    $scope.user_info = function(id){
    	$location.path('/user_info/'+id);
    }	
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
	    	url:'/save_comchat',
	    	data: {
	    		user_id: cur_user,
	    		community_id: $routeParams.id,
	    		content: $scope.liveMessage
	    	}
		}).then(function(result){
			$scope.liveMessage = "";
        	$rootScope.socket.emit('add message community',new_message)
		});	
    }
    $rootScope.socket.on('add message community',function(data){
    	$scope.$apply(function(){
    		$scope.chats.push(data);
    	})
        
    });

}).controller('create_community', function($scope, $http, $location,$window,$base64,Upload){
	
	angular.element(document).ready(function () {
		$('#members').dropdown({
	  	});
	});

	function confirmData(){
		if ($scope.group_name == undefined || $scope.description == undefined || $scope.members == undefined )
			return 1
		else 
			return 2
	};

	$scope.create_group = function(){
		if (confirmData() == 1)
			swal("Make Sure All The Column Done");
		else{
			var data = {
				description 	: $scope.description, 
				name 	: $scope.group_name,
				photoURL 	: $scope.photoURL
			};
			$http({
				method: "POST", 
				url: '/createCommunity', 
				data: data
			}).then(function(result){

				if(result.data.success==false){
					swal(result.data.msg);
				}
				else{
					$location.path('/view_community/'+result.community_id);	            		
            	}
            }).catch(function(err){
            	console.log(err)
            });

  		}
    }
	$scope.uploadImageFile = function(file){
		Upload.base64DataUrl($scope.uploadImage).then(function(urls){
			var options = {
				url 	: '/upload',
				method 	: 'POST',
				data 	: {
					filename: $scope.uploadImage.name.split('.')[0],
					data 	: urls
				}
			}
			$http(options)
				.then(function(response){
					console.log(response)
					$scope.photoURL = response.data;
				})
		});
	}
});