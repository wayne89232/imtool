'use strict';

angular.module('myApp.controllers').controller('user_info', function($scope, $http, $location,$routeParams,$window){
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


    $scope.genderModel = [{
    	value 	: "Male",
    	id 		: "B"
    },{
    	value 	: "Female",
    	id 		: "G"
    }]

	$scope.editUserInfo = function(){

		$scope.skills = _.map($scope.skill_list,function(element){
			return element.Skill.skill_id;
		})

		$scope.gender = findGenderInit($scope.user_info.gender)

		angular.element(document).ready(function () {
			$('.ui.modal.editUserInfo').modal('show');
			$('#skills').dropdown({
				maxSelections: 5,
				allowAdditions: true
			});
			$('.ui .dropdown').dropdown({
				maxSelections: 5,
				allowAdditions: true
			});
		});


    }
	$scope.view_mission = function(id){
		$location.path('/view_mission/'+id);
	}
	$scope.edit = function(){
		$scope.user_info.gender = $scope.gender.id;
		$('.ui.modal.editUserInfo').modal('hide');
		console.log($scope.user_info.gender)
	}
	function findGenderInit(nowGender){
		return $scope.genderModel[0].id == nowGender ? $scope.genderModel[0] : $scope.genderModel[1]
	}
});