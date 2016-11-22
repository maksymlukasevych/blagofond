'use strict';

angular.module('myApp')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state( 'need', {
        url: "/need/:id",
        templateUrl: "need/need.html",
        controller: "NeedController"
	})
}])

.controller('NeedController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {

var needId = $stateParams.id;

$http.post('api/needs/getNeed.php', needId).success(function(data) {
    $scope.need = data[0];

    var art = $( ".article-text" );
    var html = $.parseHTML( $scope.need["text"] )
    art.append( html );

});




}]);

