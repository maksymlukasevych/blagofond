'use strict';

angular.module('myApp')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/article/:id', {
    templateUrl: 'article/article.html',
    controller: 'ArticleCtrl'
  });
}])





.controller('ArticleCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

var articleId = $routeParams.id;

$http.post('api/readArticle.php', articleId).success(function(data) {
    $scope.article = data;

    var art = $( ".article-text" );
    var html = $.parseHTML( $scope.article["text"] )
    art.append( html );

});




}]);


