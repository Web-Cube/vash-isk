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
		
		$(".js-scroll-to").click(function() {
			var attr_href = $(this).attr("href");
			var data_href = $(this).data("href");
			if ( data_href ) {
				attr_href = data_href;
			}
			$("html, body").animate({
				scrollTop: $(attr_href).offset().top + "px"
			}, {
				duration: 1000
			});
			return false;
		});
		
		$('.js-confirm-number').click(function(){
			
			$('.js-sms').slideDown(300);
			
			setTimeout(function(){
				$('.js-confirm-number').addClass('is-active');
			},500);
			
			if( $(this).hasClass('is-active') ) {
				
				$('.js-sms').slideUp(300);
				
				$('.js-sucsess').fadeIn(300);
				
				$(this).hide();
				
			}
			
		});
		
		$('.js-toggle-sesult').click(function(){
			
			$('.js-result-box').fadeToggle(300);
			
			$(this).toggleClass('is-disabled');
			
		});
		
		$('.faq__item-head').click(function(){
			
			if ( $(this).closest('.faq__item').hasClass('is-active') ) {
				
				$(this).closest('.faq__item').removeClass('is-active');
				$(this).closest('.faq__item').find('.faq__item-content').slideUp(300);
			} else {
				
				$('.faq__item.is-active').removeClass('is-active');
				$('.faq__item-content:visible').slideUp(300);
				$(this).closest('.faq__item').find('.faq__item-content').slideDown(300);
				$(this).closest('.faq__item').addClass('is-active');
				
			}
			
		});

	}
}

export { defaults }