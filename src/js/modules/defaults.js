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
			
			$(".js-scroll-animateme").each(function(){
				var viewport_height = $(window).height();
    			var scroll_top = $(window).scrollTop();
				
				var animate_pos = $(this).offset().top;
				var animate_offset = $(this).data("animate-offset");
				var animate_delay = $(this).data("animate-delay");
				var animate = $(this).data("animate-class");
				var win_scroll = scroll_top + viewport_height - animate_offset;
				$(this).css("transition-delay",animate_delay+"ms");
				
				if ( $(window).scrollTop() >= 100 ) {
					$(this).addClass(animate);
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
		
		let stepLength = $('.quiz__top-item').length;
		let percent = 100/stepLength;
		
		$('.js-next-step').click(function(){

			let width = $('.quiz__line').width()/6;
			let scaleWidth = $('.quiz__scale').width();
			let resultWidth = width + scaleWidth;
			
			$('.quiz__step.is-active').hide().removeClass('is-active').next().addClass('is-active').fadeIn(500);
			
			$('.quiz__top-item.is-active').addClass('is-complete').removeClass('is-active').next().addClass('is-active');
			
			$('.quiz__scale').css('width', resultWidth);
			
			return false;
			
		});
		
		$('.js-prev-step').click(function(){
			
			$('.quiz__step.is-active').hide().removeClass('is-active').prev().addClass('is-active').fadeIn(500);
			
			return false;
			
		});
		
		$('.js-step-status').click(function(){
			$(this).closest('.quiz__step').hide();
			$('.quiz__step_status').fadeIn(300);
			
			setTimeout(function(){
				$('.status-list__item:nth-child(1)').removeClass('is-wait').addClass('is-complete');
				$('.status-list__item:nth-child(2)').addClass('is-wait');
				setTimeout(function(){
					$('.status-list__item:nth-child(2)').removeClass('is-wait').addClass('is-complete');
					$('.status-list__item:nth-child(3)').addClass('is-wait');
					setTimeout(function(){
						$('.status-list__item:nth-child(3)').removeClass('is-wait').addClass('is-complete');
						$('.status-list__item:nth-child(4)').addClass('is-wait');
						setTimeout(function(){
							$('.status-list__item:nth-child(4)').removeClass('is-wait').addClass('is-complete');
							$('.status-list__item:nth-child(5)').addClass('is-wait');
						}, 3000);
					}, 3000);
				}, 3000);
			}, 3000);
			
			return false;
		});
		
		$('.js-to-pay').click(function(){
			$('.status-list__item:nth-child(5)').removeClass('is-wait').addClass('is-complete');
			$('.status-list__item:nth-child(6)').addClass('is-wait');
			
			let width = $('.quiz__line').width()/6;
			let scaleWidth = $('.quiz__scale').width();
			let resultWidth = width + scaleWidth;
			$('.quiz__scale').css('width', resultWidth);
			$('.quiz__top-item.is-active').addClass('is-complete').removeClass('is-active').next().addClass('is-active');
		});
		
		$('.js-to-docs').click(function(){
			$('.status-list__item:nth-child(6)').removeClass('is-wait').addClass('is-complete');
			$('.status-list__item:nth-child(7)').addClass('is-wait');
			setTimeout(function(){
				$('.status-list__item:nth-child(7)').removeClass('is-wait').addClass('is-complete');
				$('.quiz__top-item.is-active').addClass('is-complete').removeClass('is-active').next().addClass('is-active');
				$('.quiz__scale').css('width', '100%');
			}, 5000);
			
			return false;
		});
		
		$('.service-form__radio .radio__input').change(function(){
			
			if ( $('.js-show-form').hasClass('is-hidden') ) {
				$('.js-show-form').removeClass('is-hidden');
			}
			
		});
		
		$('.js-state').change(function(){
			$('.location__btn').removeClass('is-disabled').addClass('js-close-modal');
		});
		
		$('.js-city').change(function(){
		
			$('.location__field').slideDown(300);
			
		});
		
		$('.js-auto').change(function(){
		
			$('.location__field').slideUp(300);
			
		});

	}
}

export { defaults }