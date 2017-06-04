/*jslint browser: true*/
/*global jQuery*/

//-----------------------------------------------------------------------

(function ($) {
	'use strict';

	$.fn.feedback = function (options) {

		var settings = $.extend({
			position: 'relative',
			at: 'top right',
			iconSize: 3
		}, options),
			snippet =
			'<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css">' +
			'<div style="background:white;color:black;font-size:' + parseFloat(settings.iconSize) + 'em;position:absolute;top:0;right:0;border-radius:1em;">' +
			'<div style="display:block;width:1.5em;height:1.5em;line-height:1.5em;text-align:center;"><i class="fa fa-envelope" aria-hidden="true"></i><span class="glyphicon glyphicon-search" aria-hidden="true"></span></div' +
			'<button type="button" class="btn btn-primary dropdown-toggle btn-circle btn-lg" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-bug fa-2x" title="Report Bug"></i></button>' +
			'</div>';

		return this.each(function (id, elem) {
			var obj = $(elem);

			obj.css('position', 'relative');
			obj.prepend(snippet);
		});
	};

}(jQuery));

//-----------------------------------------------------------------------
