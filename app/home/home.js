'use strict';

angular.module('myApp.view1', [])


.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state( 'home', {
        url: "/",
        templateUrl: "home/home.html",
        controller: "HomeController",
        data: {
          'noLogin': true
        }
	})
}])



.controller('HomeController', [function() {

}]);