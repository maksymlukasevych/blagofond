'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'summernote',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
}])

