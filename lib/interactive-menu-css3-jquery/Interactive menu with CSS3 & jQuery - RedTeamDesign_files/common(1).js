// Add shadow when scrolling
jQuery(document).ready(function( $ ) {	
	$(window).scroll(function () { 
		  if ($(window).scrollTop() > 20) $('body').addClass('body-shadow');
			else if ($(window).scrollTop() <= 20) $('body').removeClass('body-shadow');
	});	
});