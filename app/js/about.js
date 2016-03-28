/*jslint browser: true*/
/*global $,config,dict,cityConfig*/

//-----------------------------------------------------------------------

function about() {
	'use strict';

	var max = (0 === cityConfig.cards.length ? 1 : cityConfig.cards.length),
		fine = 0,
		error = 0,
		str = '';

	function sortLicense(left, right) {
		if (left.licenseURL === right.licenseURL) {
			return (left.attribution > right.attribution) ? 1 : -1;
		}
		return left.licenseURL > right.licenseURL ? 1 : -1;
	}

	function updateBars() {
		var sum = 0,
			err = (error * 100 / max),
			fin = (fine * 100 / max);

		$('#progressDanger').text((parseInt(err * 10, 10) / 10) + '%' + (err > 20 ? ' ' + dict.progressCorrupt : ''));
		if ((0 < err) && (err < 3)) {
			err = 3;
		}
		sum += err;

		$('#progressSuccess').text((parseInt(fin * 10, 10) / 10) + '%');
		if ((0 < fin) && (fin < 3)) {
			fin = 3;
		}
		sum += fin;

		$('#progressBar').css('width', (100 - Math.max(sum, 100)) + '%');
		$('#progressSuccess').css('width', fin + '%');
		$('#progressDanger').css('width', err + '%');
	}

	function showLicenseTable() {
		function addLicense(url, attributions) {
			var str = '',
				license = url;

			if (attributions.length > 0) {
				if ('http://creativecommons.org/licenses/by/3.0/de/' === url) {
					license = dict.licenseCCBY;
				} else if ('http://creativecommons.org/licenses/by-sa/3.0/de/' === url) {
					license = dict.licenseCCBYSA;
				}
				str += '<div class="panel-heading"><h3 class="panel-title">' + license + '</h3></div>';
				str += '<div class="panel-body">';
				str += attributions;
				str += '</div>';
			}

			return str;
		}

		var str = '',
			currectLicence = '',
			currentAttribution = '',
			attribution = '',
			i = 0;

		config.feed.sort(sortLicense);

		for (i = 0; i < config.feed.length; ++i) {
			if (config.feed[i].licenseURL !== currectLicence) {
				str += addLicense(currectLicence, attribution);
				currectLicence = config.feed[i].licenseURL;
				currentAttribution = config.feed[i].attribution;
				attribution = '"' + config.feed[i].attribution + '"';
			} else {
				if (currentAttribution !== config.feed[i].attribution) {
					currentAttribution = config.feed[i].attribution;
					attribution += ', "' + config.feed[i].attribution + '"';
				}
			}
		}
		str += addLicense(currectLicence, attribution);

		$('#licensetable').html(str);
	}

	function readCardInfos() {
		function colorizeCard(data) {
			data = data || {};
			data.portal = data.portal || {};
//			data.portal.license = data.portal.license || '';
			data.portal.licenseURL = data.portal.licenseURL || '';
			data.portal.attribution = data.portal.attribution || '';
//			data.portal.author = data.portal.author || '';

			var item = {
				licenseURL: data.portal.licenseURL.trim(),
				attribution: data.portal.attribution.trim()
			};

			config.feed.push(item);

			++fine;
		}

		if (config.loaded < cityConfig.cards.length) {
			var url = cityConfig.cards[config.loaded];
			$.ajax(url)
				.done(function (json) {
					var data = $.parseJSON(json);
					colorizeCard(data);
				})
				.fail(function (jqXHR, textStatus) {
					if ('parsererror' === textStatus) {
						try {
							var data = $.parseJSON(jqXHR.responseText);
							if (typeof data.location !== 'undefined') {
								colorizeCard(data);
								return;
							}
						} catch (e) {
						}
					}
					++error;
				})
				.always(function () {
					if (config.loadLicenses) {
						updateBars();
						++config.loaded;
						readCardInfos();
					}
				});
		} else {
			fine = max;
			updateBars();

			showLicenseTable();
		}
	}

	str += '<div class="panel panel-info">';
	str += '<div class="panel-heading"><h3 class="panel-title">' + dict.aboutTitle + '</h3></div>';
	str += '<div class="panel-body">';

	str += '<p>' + dict.aboutIntroduction + '</p>';
	str += '<p>' + dict.aboutHexagon + '</p>';
	str += '<p>' + dict.aboutFeedback + '</p>';
	str += '<p>' + dict.aboutLicense + '</p>';
	str += '<p>' + dict.aboutContribute + '</p>';
	str += '<p>' + dict.aboutAttribution + '</p>';

	str += '<div class="panel panel-info" id="licensetable">';
	str += '<div class="panel-heading"><h3 class="panel-title">' + dict.aboutCreateAttributions + '</h3></div>';
	str += '<div class="panel-body">';

	str += '<div class="progress">';
	str += '<div id="progressSuccess" class="progress-bar progress-bar-success" style="width:0%;"></div>';
	str += '<div id="progressDanger" class="progress-bar progress-bar-danger" style="width:0%;"></div>';
	str += '<div id="progressBar" class="progress-bar progress-bar-striped active" style="width:100%;"></div>';
	str += '</div>';

	str += '</div>';
	str += '</div>';

	str += '</div>';
	str += '</div>';

	$('#build').html(str);

	updateBars();

	readCardInfos();
}

//-----------------------------------------------------------------------
