'use strict';

angular.module('myApp')
.directive('toggleHeader', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

    	$(window).scroll(function() {
			if (($(".header.fixed").length > 0)) { 
				if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
				} else {
					$("body").removeClass("fixed-header-on");
				}
			};
		});
      
  //   	var nav = element.find('.header-right');
  //   	var toggleButton = element.find('.toggle-button');

  //   	toggleButton.on( "click", function() {
		//   nav.toggle(200);
		// });


  //   	$( window ).resize(function() {
		//   if ($( window ).width() > 800) {
		//   	nav.css("display", "inline-block")
		//   	nav.show(200);
		//   } else {
		//   	nav.css("display", "block")
		//   	nav.hide();
		//   }
		// });


    }
  };
});
