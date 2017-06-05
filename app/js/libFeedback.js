/*jslint browser: true*/
/*global jQuery*/

//-----------------------------------------------------------------------

(function ($) {
	'use strict';

	$.fn.feedback = function (options) {

		var settings = $.extend({
			position: 'relative',
			at: 'top right',
			background: '#265a88',
			color: 'white',
			iconSize: 2.5,
			iconFace: 'glyphicon-envelope'
		}, options),
			snippet =
			'<div style="background:' + settings.background + ';color:' + settings.color + ';font-size:' + parseFloat(settings.iconSize) + 'em;position:absolute;top:0;right:0;border-radius:1em;" class="feedback-button">' +
			'<div style="display:block;width:2em;height:2em;line-height:2.25em;text-align:center;"><span class="glyphicon ' + settings.iconFace + '" aria-hidden="true"></span></div>' +
			'</div>';

		return this.each(function (id, elem) {
			var obj = $(elem);

			obj.css('position', 'relative');
			obj.prepend(snippet);
			obj.find('.feedback-button').on('click', function (e) {
				e.stopPropagation();
				console.log('x');
			});
		});
	};

}(jQuery));

//-----------------------------------------------------------------------
