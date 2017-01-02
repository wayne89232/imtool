'use strict';

angular.module('myApp.controllers').controller('community', function($scope, $http, $location,$window){
	$http({ method:"GET", url:'/list_ur_community/'+ $window.localStorage.getItem("user_id") }).then(function(communities){
		console.log(communities)
		$scope.communities = communities.data.data;

	});
	$scope.view_community = function(id){
    	$location.path('/view_community/'+id);
    }	
    $scope.create = function(){
    	$location.path('/create_community');
    }
}).controller('view_community', function($scope, $http, $location,$window,$routeParams,$rootScope){
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
    		$scope.chatlogs.push(data);
    	})
        
    });

}).controller('create_community', function($scope, $http, $location,$window,$base64,Upload){
	
	angular.element(document).ready(function () {
		$('#members').dropdown({
	  	});
	});
	$http({ method:"GET", url:'/user_list/' }).then(function(users){
		$scope.users = users.data.data;
	});
	function confirmData(){
		if ($scope.name == undefined || $scope.members == undefined )
			return 1
		else 
			return 2
	};

	$scope.create_group = function(){
		if (confirmData() == 1)
			swal("Make Sure All The Column Done");
		else{
			var data = {
				description 	: $scope.description || "temp", 
				name 	: $scope.name,
				photoURL 	: $scope.photoURL,
				members: $scope.members
			};
			$http({
				method: "POST", 
				url: '/createCommunity', 
				data: data
			}).then(function(result){

				if(result.data.success==false){
					swal("Failed on creating group");
				}
				else{
					$location.path('/view_community/'+result.data.data.community_id);	            		
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