'use strict';
angular.module('myApp')
  .service('SessionService', ['$injector', function($injector) {

      this.checkAccess = function(event, toState, toParams, fromState, fromParams) {
        var $scope = $injector.get('$rootScope'),
            $sessionStorage = $injector.get('$sessionStorage');




        if (toState.data && toState.data.needLogin) {
            // если нужно, выполняйте здесь какие-то действия 
            // перед входом без авторизации
             if ($sessionStorage.user) {
                $scope.$root.user = $sessionStorage.user;
              } else {
                // если пользователь не авторизован - отправляем на страницу авторизации
                event.preventDefault();
                $scope.$state.go('login');
              }
              
        } else {
          // вход с авторизацией
         
        }






      };
    }
  ]);