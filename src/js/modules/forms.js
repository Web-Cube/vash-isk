import Inputmask from "inputmask";
import validate from "jquery-validation";
import { config } from "../config";

var forms = {
	mask: () => {
		var phone = document.querySelectorAll("input[name='phone']");
		var series = document.querySelectorAll("input[name='series']");
		var date = document.querySelectorAll("input[name='date']");

		var im = new Inputmask({
			mask: "+7 (999) 999-99-99",
			clearMaskOnLostFocus: true,
			clearIncomplete: false,
		});
		
		var seriesMask = new Inputmask({
			mask: "99 999999",
			clearMaskOnLostFocus: true,
			clearIncomplete: false,
		});
		
		var dateMask = new Inputmask({
			mask: "99.99.9999",
			clearMaskOnLostFocus: true,
			clearIncomplete: false,
		});

		im.mask(phone);
		
		seriesMask.mask(series);
		dateMask.mask(date);
	},

	validate: () => {
		$("form").each((i, el) => {
			var $form = $(el);

			$form.validate({
				errorPlacement: function (error, element) {
					//just nothing, empty
				},
				highlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.addClass(errorClass)
						.removeClass(validClass);
				},
				unhighlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.removeClass(errorClass)
						.addClass(validClass);
				},
				submitHandler: (form) => {
					var data = $(form).serialize();

					$.ajax({
						type: "POST",
						url: $(form).attr("action"),
						data: data,
						success: function (data) {
							$(form)[0].reset();
						},
					});
				},
				rules: {
					phone: {
						required: true,
						minlength: 10,
					},
				},
			});
		});
	},

	events: () => {
		$(".input__field")
			.on("focus", (e) => {
				let $input = $(e.target);
				$input.parent().addClass("is-focus");
			})
			.on("blur change", (e) => {
				let $input = $(e.target);

				if ($input.val() == "") $input.parent().removeClass("is-focus");
			});
	},
	
	label: () => {
		
		$('.field__input').each(function(){
			let placeholder = $(this).attr('placeholder');
			$(this).parent().append('<label class="field__mask">' +placeholder+ '</label>');
			$(this).attr('placeholder','');
			if ( $(this).val().length > 1 ) {
				$(this).closest('.field').find('.field__mask').addClass('is-focus');
			}
		}).blur(function(){
			if ( $(this).val().length > 1 ) {
				$(this).parent().find('.field__mask').addClass('is-focus');
			} else {
				$(this).parent().find('.field__mask').removeClass('is-focus');
			}
		});
		
		$('.field__mask').click(function(){
			$(this).parent().find('.field__input').focus();
		});
		
	},

	init: () => {
		forms.mask();
		forms.validate();
		forms.events();
		forms.label();
	},
};

export { forms };
