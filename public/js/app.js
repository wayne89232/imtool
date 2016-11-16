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
    when('/missions', {
      templateUrl: 'partials/missions',
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
    when('/home', {
      templateUrl: 'partials/community',
      controller: 'AppCtrl'
    }).
    otherwise({
      redirectTo: '/community'
    });

  
});
