'use strict';

angular.module('myApp.view2', [])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state( 'dashboard', {
        url: "/dashboard",
        templateUrl: "dashboard/dashboard.html",
        controller: "DashboardController",
        data: {
          noLogin: true
        }
    })
 
 }])





.controller('DashboardController', ['$scope', '$http', function($scope, $http) {



$scope.article = {};


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = dd+'.'+mm+'.'+yyyy;
$scope.article.date = today;

$scope.cons = function(argument) {
    // alert(typeof($scope.text));
var article = {};

$http.post('api/createArticle.php', $scope.article).success(function(data) {
    $scope.article = data;
});

}


$scope.options = {
    height: 500,
    focus: true,
    // airMode: true,
    toolbar: [
            ['edit',['undo','redo']],
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            // ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
            ['fontclr', ['color']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
            ['height', ['height']],
            ['insert', ['link','picture','video','hr', 'table']],
            ['view', ['fullscreen', 'codeview']],
            ['help', ['help']]
        ]
  };





}]);


