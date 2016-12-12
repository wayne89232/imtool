'use strict';

angular.module('myApp.controllers').controller('rank_list', function($scope, $http, $location){


	$scope.tagChange = function(){
		var newTag = $scope.toolTag.id
		console.log(newTag)
		// $scope.toolTagList = $scope.toolAllTagList[newTag]
	}
	
	$scope.toolTotalList = [{
		imgUrl 			: '/assets/images/JianYi.jpg',
		account 		: 'ianlee1228',
		rank 			: 4.8,
		star 			: 5,
		completedMission: 50
	},{
		imgUrl 			: '/assets/images/wei.jpg',
		account 		: 'wayne89232',
		rank 			: 4.1,
		star 			: 4,
		completedMission: 60
	},{
		imgUrl 			: '/assets/images/hong.jpg',
		account 		: 'dilmahlee',
		rank 			: 3.7,
		star 			: 4,
		completedMission: 35
	}];

	$scope.toolTagList = [{
		imgUrl 			: '/assets/images/JianYi.jpg',
		account 		: 'ianlee1228',
		rank 			: 4.8,
		star 			: 5,
		completedMission: 50
	},{
		imgUrl 			: '/assets/images/wei.jpg',
		account 		: 'wayne89232',
		rank 			: 4.1,
		star 			: 4,
		completedMission: 60
	},{
		imgUrl 			: '/assets/images/hong.jpg',
		account 		: 'dilmahlee',
		rank 			: 3.7,
		star 			: 4,
		completedMission: 35
	}];


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
	// 	$http({
	// 		method: 'GET',
	// 		url: 	'/getRankList'
	// 	}).then(function(response){
	// 		$scope.toolTotalList 	= calculateStar(response.toolTotalList);
	// 		$scope.toolAllTagList 	= response.toolAllTagList;
	// 		$scope.userTotalList 	= calculateStar(response.userTotalList);
	// 		$scope.userAllTagList 	= response.userAllTagList;
	// 	})
	// }

	// $scope.init();


	function calculateStar(dataList){
		dataList.forEach(function(element,index){
			dataList[index].star = Math.round(element.rank);
		})
	};

	angular.element(document).ready(function () {
		$('.ui.rating').rating('disable');
		$('.sortable.table').tablesort();
		$('.tabular.menu .item').tab();
	});


});