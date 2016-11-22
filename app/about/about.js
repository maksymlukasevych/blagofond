'use strict';

angular.module('myApp')




.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state( 'about', {
        url: "/about",
        templateUrl: "about/about.html",
        controller: "AboutController"
	})
}])





.controller('AboutController', ['$scope', '$http', 'Cropper', '$timeout', '$modal', function($scope, $http, Cropper, $timeout, $modal) {

$http.post('api/team/getMembers.php').success(function(data) {
        $scope.team = data;
    });


}])



