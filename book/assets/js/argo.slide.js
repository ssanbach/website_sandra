
jQuery(function($){
	/**
	 * Init slide
	 * --------
	 */
	var options = {
        nextButton: true,
        prevButton: true,
       // pagination: true,
        animateStartingFrameIn: true,
      //  autoPlay: true,
        autoPlayDelay: 3000,
    };
	var mySequence = $("#sequence").sequence(options).data("sequence");
})



jQuery(window).load(function(){

	//Process IMGs on resize
	
	jQuery('.sequence-canvas > li > img').each(function(){
		jQuery(this).data('owidth',jQuery(this).width());
	}).promise().done(resize_slide);

	jQuery(window).resize(function(){
		resize_slide();
	});
	function resize_slide(){
		var sequence = jQuery('#sequence')
		var swidth = sequence.width();
		var ratio = 1170/swidth;
		var sheigh = Math.ceil(swidth/(1170/700));
			sequence.height(sheigh);
		jQuery('.sequence-canvas > li > img').each(function(){
			jQuerythis = jQuery(this);
			owidth = jQuerythis.data('owidth');
			jQuerythis.width(owidth/ratio);
		});
	}

})