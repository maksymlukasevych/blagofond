'use strict';

angular.module('myApp')


.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state( 'news', {
        url: "/news",
        templateUrl: "news/news.html",
        controller: "NewsController",
	})
}])



.controller('NewsController', ['$scope', '$http', 'Cropper', function($scope, $http, Cropper) {

$http.post('api/articleTitles.php').success(function(data) {
    $scope.allNews = data;
   	// console.log(data);
    $scope.news = [];
    $scope.loadMore(true);
    
});




$scope.loadMore = function(first) {
	if ($scope.news || first) {
		var count = 0;
		for (var i = $scope.allNews.length - 1; i >= 0; i--) {
			console.log($scope.allNews);
			if (count < 5) {
				$scope.news.push($scope.allNews[i]);
				$scope.allNews.splice(i, 1);
				count++;
			} else {
				break
			}
		}
	}
}




}]);