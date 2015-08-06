'use strict';

angular.module('myApp')




.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state( 'article', {
        url: "/article/:id",
        templateUrl: "article/article.html",
        controller: "ArticleController"
	})
}])





.controller('ArticleController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

var articleId = $stateParams.id;

$http.post('api/readArticle.php', articleId).success(function(data) {
    $scope.article = data;

    var art = $( ".article-text" );
    var html = $.parseHTML( $scope.article["text"] )
    art.append( html );

});




}]);


