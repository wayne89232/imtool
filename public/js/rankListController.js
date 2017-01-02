'use strict';

angular.module('myApp.controllers').controller('rank_list', function($scope, $http, $location){

	$http({
		method: 'GET',
		url: 	'/missionCleared'
	}).then(function(response){
		$scope.missionClearedList = response.data
		// angular.element(document).ready(function () {
		// 	$('.ui.rating').rating('disable');
		// 	$('.sortable.table').tablesort();
		// 	$('.tabular.menu .item').tab();
		// });
		$http({
			method: 'GET',
			url: 	'/function_ranking'
		}).then(function(response){
			response.data.data.forEach(function(element){
				console.log(element)
				if(element.Skill == "Bike")
					$scope.bikeQuality = parseToArray(element.user)
				else if (element.Skill == "handsome")
					$scope.homeworkQuality = parseToArray(element.user)

			})
			$http({
				method: 'GET',
				url: 	'/ranking'
			}).then(function(response){
				$scope.totalQuality = response.data.data
			})
			
		})
	})

	function parseToArray(object){
		var resultArray = []
		for (var key in object){
			resultArray.push(object[key])
		}
		return resultArray
	}



	$scope.tagChange = function(){
		var newTag = $scope.toolTag.id
		console.log(newTag)
		// $scope.toolTagList = $scope.toolAllTagList[newTag]
	}

	$scope.totalQuality = $scope.toolTotalList
	console.log($scope.totalQuality)

	angular.element(document).ready(function () {
		// $('.ui.rating').rating('disable');
		// $('.sortable.table').tablesort();
		$('.menu .item').tab();
	});

	$scope.showDetail = function(){
		$scope.modalList = $scope.missionClearedList
		$('.ui.missionCompleted.modal').modal('show');
	};
	$scope.showRanking = function(){
		var selected = $('.item.active').index();
		if (selected == 0)
			$scope.modalList = $scope.totalQuality
		else if (selected == 1)
			$scope.modalList = $scope.bikeQuality
		else
			$scope.modalList = $scope.homeworkQuality
		$('.ui.ranking.modal').modal('show');
	};

	$scope.tagModel = [{
		value 	: "Delivery",
		id 		: "Delivery"
	},{
		value 	: "Homework",
		id 		: "Homework"
	},{
		value 	: "Taxi",
		id 		: "Taxi"
	}]

	// $scope.init = function(){

		
	// 	// $http({
	// 	// 	method: 'GET',
	// 	// 	url: 	'/ranking'
	// 	// }).then(function(response){
	// 	// 	console.log(response)
	// 	// 	// $scope.toolTotalList 	= calculateStar(response.toolTotalList);
	// 	// 	// $scope.toolAllTagList 	= response.toolAllTagList;
	// 	// 	// $scope.userTotalList 	= calculateStar(response.userTotalList);
	// 	// 	// $scope.userAllTagList 	= response.userAllTagList;
	// 	// })
	// 	$http({
	// 		method: 'GET',
	// 		url: 	'/missionCleared'
	// 	}).then(function(response){
	// 		console.log(response)
	// 		$scope.missionClearedList = response
			// angular.element(document).ready(function () {
			// 	$('.ui.rating').rating('disable');
			// 	$('.sortable.table').tablesort();
			// 	$('.tabular.menu .item').tab();
			// });
			
	// 	})
	// }

	// $scope.init();


	function calculateStar(dataList){
		dataList.forEach(function(element,index){
			dataList[index].star = Math.round(element.rank);
		})
	};

	


});