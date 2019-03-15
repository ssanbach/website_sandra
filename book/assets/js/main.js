/**
 * Theme : Argo 
 * Author: WPStrong
 * Version: 1.0
 */
var trigged=[],scrollTimeout;
jQuery(function($){
	
	//Trigger rotate
	// --------------------
	$('#header .thumb').on('rotate',function(){
		var $this = $(this);
		$this.addClass('active');
		var tout =getRandomInt(3,10)*1000;
		setTimeout(function(){
			$this.removeClass('active');
		},tout)
	});
	var rotateCycle = setInterval(function(){
		var thumbs = $('#header .thumb:not(.active)');
		$(thumbs[getRandomInt(0,thumbs.length)]).trigger('rotate');
	},3000);

	function triggerEvent(elem,fn,offset){
		var top = elem.offset().top;
		if((top-offset)<$(window).scrollTop()){
			fn(elem);
		}
	}

	//Window on scroll event
	//-------------------------------
	$(window).scroll(function(){
		var wtop = $(window).scrollTop();
		var header_heigh = $('#header').height();
		if(wtop<header_heigh){ 
			$('#navbar').removeClass('navbar-fixed-top');
			$('#header').css('margin-bottom',0);
		}

		clearTimeout(scrollTimeout);
			scrollTimeout=setTimeout(function(){
				
				triggerEvent($('#portfolio'),function(){
					if(trigged['portfolio']) return;
					$('.isotope .item').addClass('active');
					trigged['portfolio'] = true;
				},100);

				triggerEvent($('#about-us'),function(){
					if(trigged['about-us']) return;
					$('.progress .bar').each(function(){
						var $this=$(this);	
						$this.css('width',$this.data('width')+'%');			
					});
					trigged['about-us'] = true;
				},200);

			},50);
				
			triggerEvent($('#navbar'),function(elem){
				if(elem.hasClass('navbar-fixed-top')) return;
				 elem.addClass('navbar-fixed-top');
				 $('#header').css('margin-bottom',$('#navbar').height());
				},0)
	});

	//Window on resize event
	//------------------------------------------------
	$(window).resize(function(){
	
			var metro = $('#header .container.visible-phone:visible');
			var bricks = metro.find('.brick1');
			var size = metro.width()/2
			bricks.css({width:size,height:size});
		

	});

	$(window).trigger('resize');

	//Vertical scroll for blog section
	//------------------------------------------
	$(".blog_container").mCustomScrollbar({
		horizontalScroll:true,
		advanced:{
			autoExpandHorizontalScroll:true
		}
	});

	
	// Nav button click 
	// -------------------------------------------------------
	
	$('#navbar .nav a , #header a.nav-item , #navbar .brand,#btn_up').click(function(e){
		e.preventDefault();
		var des = $(this).attr('href');
		if($('.navbar .nav-collapse').hasClass('in')){
			$('.navbar .btn-navbar').trigger('click');
		}
		goToSectionID(des);
	})

	/**
	 * Isotope filter
	 */
		// cache container
		var $container = $('.isotope');
		// initialize isotope
		$container.isotope({
		  // options...
		});

		// filter items when filter link is clicked
		$('.filter a').click(function(){
		  var selector = $(this).attr('data-filter');
		  $container.isotope({ filter: selector });
		  $('.filter a.active').removeClass('active');
		  $(this).addClass('active');
		  return false;
		});

	/**
	 * Portfolio hover effect 
	 */
		$(' .isotope > li ').each( function() { 
			$(this).hoverdir({
				hoverDelay : 0
			}); 
		} );

	/**
	 * Init carousel
	 */
	$('#msgs').carousel({interval:5000});

	
	/**
	 * Detect IE 10
	 */
	
	if (/*@cc_on!@*/false) {  
   		$("html").addClass("ie10");  
   		
	}	 
	// if ($.browser.msie && $.browser.version == 10) {
	// 	  $("html").addClass("ie10");
	// 	}
})

$(window).load(function($){

	// Trigger window scroll event when page loaded
	// -------------------------------------------------------
	jQuery(window).trigger('scroll');

})

//Custom functions 

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Scroll to section
 * @param  string des HTML identity of section block
 * @return void
 */
onanimate = false;
function goToSectionID(des){
	onanimate = true;
	var pos = (jQuery(des).length>0 )?jQuery(des).offset().top:0;
	jQuery('html,body').animate({scrollTop:pos},1000,function(){
		if(history.pushState){
			history.pushState(null,null,des);
		}else		window.location.hash = des;
		jQuery(window).scrollTop(pos);
		onanimate=false
	});
}