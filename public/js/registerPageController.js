'use strict';

angular.module('myApp.controllers').controller('register_page', function($scope, $http, $location){
	$('.ui .dropdown').dropdown({
		maxSelections: 5,
		allowAdditions: true
	});

	$('#skills').dropdown({
    	maxSelections: 5,
    	allowAdditions: true
  	});

  	$scope.register = function(){
		if($scope.password==$scope.password_confirm){
            var data = {
                account: $scope.account, 
                password: $scope.password,
                user_name: $scope.name,
                gender: $scope.gender,
                email: $scope.mail
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
            });
    	}
    	else{
    		alert("Confirm password");
    	}
    }
	$scope.test = function(){
		console.log($scope.uploadImage);
	}

	$scope.uploadImageFile = function(file){
		// Upload.upload({
		// 	url 	: '/upload',
		// 	method 	: 'POST',
		// 	headers :{
		// 		'Content-Type': $scope.uploadImage.type
		// 	},
		// 	data 	: {file: $scope.uploadImage}
		// }).then(function(response){
		// 	console.log(response)
		// })

		// Upload.http({
		// 	url 	: '/upload',
		// 	method	: 'POST',
		// 	headers :{
		// 		'Content-Type': 'multipart/form-data'
		// 	},
		// 	data: file
		// }).then(function(response){
		// 	console.log(response)
		// });
		var fd = new FormData();
		for (var key in $scope.uploadImage){
			fd.append(key , $scope.uploadImage[key])
		}
		$http.post('/upload', fd, {
			transformRequest: angular.indentity,
			headers: {'Content-Type': undefined}
		}).then(function(response){
			console.log(response)
		})
		// ,function (response) {
		// 	if (response.status > 0)
		// 		$scope.errorMsg = response.status + ': ' + response.data;
		// });

		// file.upload.progress(function (evt) {
		// 	file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		// });
	}
});