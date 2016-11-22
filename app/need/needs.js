'use strict';

angular.module('myApp')


.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state( 'needs', {
        url: "/needs",
        templateUrl: "need/needs.html",
        controller: "NeedsController",
	})
}])



.controller('NeedsController', ['$scope', '$http', function($scope, $http) {

$http.post('api/needs/get4lastNeeds.php').success(function(data) {
    $scope.needs = data;
});




}]);