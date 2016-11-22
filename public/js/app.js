'use strict';

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.
    when('/home', {
      templateUrl: 'partials/home',
      controller: 'AppCtrl'
    }).
    when('/user_info', {
      templateUrl: 'partials/user_info',
      controller: 'AppCtrl'
    }).
    when('/mission_list', {
      templateUrl: 'partials/mission_list',
      controller: 'mission_list'
    }).
    when('/mission/:id', {
      templateUrl: 'partials/mission',
      controller: 'mission'
    }).
    when('/discover', {
      templateUrl: 'partials/discover',
      controller: 'discover'
    }).
    when('/community', {
      templateUrl: 'partials/community',
      controller: 'AppCtrl'
    }).
   	when('/create_mission', {
      templateUrl: 'partials/create_mission',
      controller: 'create_mission'
    }).
    when('/rank_list', {
      templateUrl: 'partials/rank_list',
      controller: 'rank_list'
    }).
    when('/testPopup', {
      templateUrl: 'partials/testPopup',
      controller: 'testPopup'
    }).
    when('/register_page', {
      templateUrl: 'partials/register_page',
      controller: 'register_page'
    }).
    when('/view_mission', {
      templateUrl: 'partials/view_mission',
      controller: 'AppCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });

  
});
