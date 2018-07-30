'use strict';

// Declare app level module which depends on views, and components
var gameApp = angular.module('myApp', [
  'ngRoute',
  'myApp.games'
]);
gameApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  //$locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/games'});
}]);
