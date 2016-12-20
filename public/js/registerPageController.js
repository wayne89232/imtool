'use strict';

angular.module('myApp.controllers').controller('register_page', function($scope, $http, $location,$window,$base64,Upload){
	$('.ui .dropdown').dropdown({
		maxSelections: 5,
		allowAdditions: true
	});

	$('#skills').dropdown({
    	maxSelections: 5,
    	allowAdditions: true
  	});

  	$scope.genderModel = [{
  		value 	: "Male",
  		id 		: "B"
  	},{
  		value 	: "Female",
  		id 		: "G"
  	}]

	function confirmData(){
		if ($scope.password != $scope.password_confirm || $scope.password != undefined)
			return 0
		else if ($scope.account == undefined || $scope.name == undefined || $scope.gender == undefined || $scope.gender == undefined)
			return 1
		else 
			return 2
	};

	$scope.register = function(){
		if (confirmData() == 1)
			swal("Make Sure All The Collunm Done");
		else if (confirmData() == 0)
			swal("Confirm password");
		else{
			var data = {
				account 	: $scope.account, 
				password 	: $scope.password,
				user_name 	: $scope.name,
				gender 		: $scope.gender.id,
				email 		: $scope.mail,
				photoURL 	: $scope.photoURL
			};
			$http({
				method: "POST", 
				url: '/register', 
				data: data
			}).then(function(result){
				console.log(result)
				if(result.data.success==false){
					swal(result.data.msg);
				}
				else{
					var user = result.data.user
					$window.localStorage.setItem("is_login", true);
					$window.localStorage.setItem("account", user.account);
					$window.localStorage.setItem("user_id", user.user_id);
					$window.localStorage.setItem("photo", user.photo_url);
					$window.localStorage.setItem("name", user.user_name);
					$window.location.reload();       		
					$location.path('/');	            		
            	}
            }).catch(function(err){
            	console.log(err)
            });

  		}
    }
	$scope.test = function(){
		console.log($scope.uploadImage);
	}

	$scope.testSelect = function(){
		console.log("Gender: ", $scope.gender)
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


