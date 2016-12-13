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

  	$scope.register = function(){
		if($scope.password==$scope.password_confirm && $scope.password != undefined){
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
            	if(result.data.success==false){
            		alert(result.data.msg);
            	}
            	else{
				$window.localStorage.setItem("is_login", true);
				$window.localStorage.setItem("account", user.account);
				$window.localStorage.setItem("user_id", user.user_id);
				$window.localStorage.setItem("photo", user.photo_url);
					$window.location.reload();       		
                	$location.path('/');	            		
            	}
            }).catch(function(err){
            	console.log(err)
            });
    	}
    	else{
    		swal("Confirm password");
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
					filename: $scope.uploadImage.name,
					data 	: urls
				}
			}
			$http(options)
				.then(function(response){
					$scope.photoURL = response.photoURL;
				})
		});
	}
});


