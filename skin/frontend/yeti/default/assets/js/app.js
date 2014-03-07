jQuery(function() {

	//////////////////////////////////////////
	// Toggle mobile top links and search
	//////////////////////////////////////////
	
	jQuery('.mobile-links ul li a').click(function(){
		jQuery('.mobile-links ul li').removeClass('active');
		jQuery(this).parent().addClass('active');
		var currentTab = jQuery(this).attr('href');
		jQuery(currentTab).siblings().hide();
		jQuery(currentTab).toggle();
		return false;
	});

});