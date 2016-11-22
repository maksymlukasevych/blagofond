'use strict';

angular.module('myApp')


.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state( 'home', {
        url: "/",
        templateUrl: "home/home.html",
        controller: "HomeController",
	})
}])



.controller('HomeController', ['$scope', '$http', function($scope, $http) {

$http.post('api/needs/get4lastNeeds.php').success(function(data) {
    $scope.needs = data;
});

$http.post('api/articleTitles.php').success(function(data) {
	$scope.allNews = data

    $scope.news = [];

    for (var i=$scope.allNews.length-1, k=0; i > 0, k<5; i--,k++) {
    	$scope.news.push($scope.allNews[i])
    }

 
});


}]);