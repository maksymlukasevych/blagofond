(function(){
angular.module('myApp')
.controller("ApplicationController", ["$scope", "$location", "$http", function($scope, $location, $http){

  	

    $http.post('api/needs/getFields.php').success(function(data) {
        $scope.fields = data;
        console.log(data);
    });

    $http.post('api/quotes/getQuotes.php').success(function(data) {
        $scope.quotes = data;
        var index =  Math.ceil(Math.random() * ($scope.quotes.length - 1));
        $scope.quote = $scope.quotes[index];
        
    });
   

$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

  }]);
})();