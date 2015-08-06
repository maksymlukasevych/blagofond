'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'ngStorage',
  'summernote',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
}])

.run([ '$rootScope', '$state', '$stateParams', 'SessionService', function ($rootScope, $state, $stateParams, SessionService) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.user = null;

    // Здесь мы будем проверять авторизацию
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        SessionService.checkAccess(event, toState, toParams, fromState, fromParams);
      }
    );
  }
])
