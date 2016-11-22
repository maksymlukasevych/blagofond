'use strict';

angular.module('myApp')

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})



.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state( 'contacts', {
        url: "/contacts",
        templateUrl: "contacts/contacts.html",
        controller: "ContactsController"
	})
}])





.controller('ContactsController', ['$scope', '$http', '$timeout', '$modal', function($scope, $http, $timeout, $modal) {


$scope.map = { center: { latitude: 49.8381224, longitude: 24.031658 }, zoom: 16 };




}])