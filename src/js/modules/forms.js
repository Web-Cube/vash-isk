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
			clearIncomplete: true,
		});
		
		var seriesMask = new Inputmask({
			mask: "99 999999",
			clearMaskOnLostFocus: true,
			clearIncomplete: true,
		});
		
		var dateMask = new Inputmask({
			mask: "99.99.9999",
			clearMaskOnLostFocus: true,
			clearIncomplete: true,
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

	init: () => {
		forms.mask();
		forms.validate();
		forms.events();
	},
};

export { forms };
