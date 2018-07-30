'use strict';

var games = angular.module('myApp.games', ['ngRoute','ui.bootstrap']);

games.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/games', {
    templateUrl: 'games/gameView.html',
    controller: 'gamesCtrl'
  });
}])

.controller('gamesCtrl', ['gameSerivces','$scope', '$filter', function(gameSerivces, $scope, $filter) {
  $scope.games = [];
  $scope.gamesCopy = [];
  $scope.searchTxt = '';
  $scope.scoreOrder = '-score';
  $scope.sortMsg = '';

  $scope.searchActive = false;
  $scope.sortActive = false;
  
  //pagination variables
  $scope.pages =[1,2,3,4,5,6];
  $scope.totalPages = '';
  $scope.currentPage = 1;
  $scope.loadGames = function(page) {
    gameSerivces.getGamesDetail(page).then(function(response){
      $scope.games = [];
      $scope.gamesCopy = [];
      if(response.data && response.data.content.length > 0){
        $scope.games = response.data.content;
        $scope.gamesCopy = response.data.content;
        $scope.totalPages = response.data.totalPages;
        $scope.currentPage = response.data.number + 1;
        $scope.totalPages = response.data.totalPages;
      }
    });
  }

  $scope.loadGames(1);
  
  $scope.searchGames = function(name, page) {
	    gameSerivces.getGamesByName(name, page).then(function(response){
	      $scope.games = [];
	      $scope.gamesCopy = [];
	      if(response.data && response.data.content.length > 0){
	        $scope.games = response.data.content;
	        $scope.gamesCopy = response.data.content;
	        $scope.totalPages = response.data.totalPages;
	        $scope.currentPage = response.data.number + 1;
	        $scope.totalPages = response.data.totalPages;
	        if($scope.currentPage === 1) {
	        	$scope.pages =[1,2,3,4,5,6];
	        }
	      }
	    });
  }
  $scope.searchGameByName = function(data){
    //$scope.games = $filter('filter')($scope.games, data);
	  $scope.searchActive = true;
	  $scope.searchGames(data, 1);
  }

  $scope.clearSearch = function(){
    $scope.searchTxt = '';
    //$scope.games = $scope.gamesCopy;
    $scope.searchActive = false;
    $scope.loadGames(1);
  }
  
  $scope.sortByScore = function(state) {
    if(state) {
      $scope.scoreOrder = '-score';
      $scope.sortMsg = "Sorting By: Score (Decending Order) on this page."
    } else{
      $scope.scoreOrder = 'score';
      $scope.sortMsg = "Sorting By: Score (Ascending Order) on this page."
    }
  }

  $scope.updatePage = function(selectedPage) {
    $scope.currentPage  = selectedPage;
    $scope.refreshPages(selectedPage);
  }

  $scope.nextLeft = function() {
    $scope.currentPage = ($scope.currentPage > 1 ? $scope.currentPage - 1 : $scope.currentPage);
    $scope.refreshPages($scope.currentPage);
  }

  $scope.nextRight = function() {
    $scope.currentPage = ($scope.currentPage <= $scope.totalPages ? $scope.currentPage + 1 : $scope.currentPage);
    $scope.refreshPages($scope.currentPage);
  }

  $scope.refreshPages = function(selectedPage) {
    if(selectedPage % 5 === 1 && $scope.pages[0] === selectedPage && selectedPage > 1) {
      for(var i = 0; i < $scope.pages.length; i++) {
        $scope.pages[i] = $scope.pages[i] - 5;
      }
    } else if($scope.pages[5] === selectedPage && selectedPage < $scope.totalPages) {
      for(var i = 0; i < $scope.pages.length; i++) {
        $scope.pages[i] = $scope.pages[i] + 5;
      }
    }
    if($scope.searchActive) {
    	$scope.searchGames($scope.searchTxt, selectedPage);
    	$scope.sortActive = false;
    } else if($scope.sortActive){
    	var order = $scope.platformSelectedOrder==='ASC' ? 1 : 0;
    	$scope.updatePlatformSorting(selectedPage, order);
    } else {
    	$scope.loadGames(selectedPage);
    }	 
  }

  $scope.updatePlatformSorting = function(page, order){
	  $scope.sortActive = true;
	  $scope.sortMsg = "";
	  $scope.scoreOrder = order === 1 ? 'platform' : '-platform';
	  gameSerivces.getGamesSortByPlatform(page, order).then(function(response){
	      $scope.games = [];
	      $scope.gamesCopy = [];
	      if(response.data && response.data.content.length > 0){
	        $scope.games = response.data.content;
	        $scope.gamesCopy = response.data.content;
	        $scope.totalPages = response.data.totalPages;
	        $scope.currentPage = response.data.number + 1;
	        $scope.totalPages = response.data.totalPages;
	        if($scope.currentPage === 1) {
	        	$scope.pages =[1,2,3,4,5,6];
	        }
	      }
	    });
  }
}]);