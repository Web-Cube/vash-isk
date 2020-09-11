var defaults = {

	events: () => {

	},

	init: () => {

		defaults.events();
		
		$(window).on('load', function(){
			
			$('.js-gerb-animate').each(function(){
				$(this).addClass('show');
			});
			
			$(".js-animateme").each(function(){
				let animate_delay = $(this).data("animate-delay");
				let animate = $(this).data("animate-class");

				$(this).css("transition-delay",animate_delay+"ms");
				$(this).addClass(animate);
			});
			
		});
		
		$(window).scroll(function(){
			let viewport_height = $(window).height();
			let viewport_width = $(window).width();
			let scroll_top = $(window).scrollTop();

			$(".js-paralax").each(function(){
				let paralax_pos = $(this).offset().top;
				let paralax_side = $(this).data("paralax-side");
				let paralax_step = $(this).data("paralax-step");
				if ( paralax_side == 'bottom') {
					$(this).attr("style","transform: translateY(" + (-scroll_top - paralax_pos )/paralax_step + "px)" );
				} 
				if ( paralax_side == 'left') {
					$(this).attr("style","transform: translateX(" + (scroll_top - paralax_pos + viewport_height )/paralax_step + "px)" );
					if ( viewport_width < viewport_height ) {
						$(this).attr("style","transform: translateX(" + (scroll_top - paralax_pos + ( viewport_height/2 ) )/paralax_step + "px)" );
					}
				} else {
					$(this).attr("style","transform: translateY(" + (scroll_top - paralax_pos )/paralax_step + "px)" );
				}
			});

		});

	}
}

export { defaults }