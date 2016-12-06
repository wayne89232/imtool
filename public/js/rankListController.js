'use strict';

angular.module('myApp.controllers').controller('rank_list', function($scope, $http, $location){

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
	}]

	// $scope.init = function(){
	// 	$http({
	// 		method: 'GET',
	// 		url: 	'/getRankList'
	// 	}).then(function(response){
	// 		$scope.toolTotalList= calculateStar(response.toolTotalList);
	// 		$scope.toolTagList 	= calculateStar(response.toolTagList);
	// 		$scope.userTotalList= response.userTotalList;
	// 		$scope.userTagList 	= response.userTagList;
	// 	})
	// }

	// $scope.init();

	$('.ui.rating').rating('disable');
	$('.sortable.table').tablesort();
	$('.tabular.menu .item').tab();


	function calculateStar(dataList){
		dataList.forEach(function(element,index){
			dataList[index].star = Math.round(element.rank);
		})

	};


});