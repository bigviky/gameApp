gameApp.factory('gameSerivces', ['$http', function($http) {
    var gameSerivces = {};
    var Baseurl = 'data/';
    
    gameSerivces.getGamesDetail = function(page) {
        return $http.get('http://localhost:8080/games/' + (page - 1));
    };
    gameSerivces.getGamesByName = function(name, page) {
    	return $http.get('http://localhost:8080/games/' + name +'/' + (page - 1));
    }
    gameSerivces.getGamesSortByPlatform = function(page, order) {
    	return $http.get('http://localhost:8080/games/sortBy/platform/' + (page - 1) + '/' + order);
    }

    return gameSerivces;
}]);