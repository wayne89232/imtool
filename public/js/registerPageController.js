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
});