'use strict';

angular.module('myApp')


.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state( 'login', {
        url: "/login",
        templateUrl: "dashboard/login.html",
        controller: "LoginController"
	})
}])



.controller('LoginController', ['$scope', '$http', '$sessionStorage', '$rootScope', function($scope, $http, $sessionStorage, $rootScope) {


$scope.userAuth = function (name, password) {
	var user = {};
	user.name = name;
	user.password = password;

	$http.post('api/login.php', user).success(function(data) {
		console.log(data);
	          if (data === "1")$sessionStorage.user = data;
	          if ($sessionStorage.user) {
	          	$scope.cred = data;
	          	console.log(data);
	          	$rootScope.$state.go('dashboard');

	          }
	});


}



}]);