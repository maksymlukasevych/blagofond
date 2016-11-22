'use strict';

angular.module('myApp')
.directive('setHeight', function() {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      
    	elem.find('li img').on("mousedown", function(event){
    		event.preventDefault();
    	});










    	elem.find('img').bind("load" , function(e){ 

                elem.height(elem.find('img').height())
                });

    	$( window ).resize(function() {
		  elem.height(elem.find('img').height())
		});

    }
  };
})

.directive('testHeight', function() {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      
        elem.find('img').on("mousedown", function(event){
            event.preventDefault();
        });


        







        elem.find('img').bind("load" , function(e){ 

                elem.parent().height(elem.find('img').height())
                });

        $( window ).resize(function() {
          elem.height(elem.find('img').height())
        });

    }
  };
})
