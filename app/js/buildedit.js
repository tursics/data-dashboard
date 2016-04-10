/*jslint browser: true*/
/*global $,config,dict,cityConfig,createNewCard,stringValueFormatter,intValueFormatter,euroValueFormatter,dateValueFormatter*/

//-----------------------------------------------------------------------

function fillBuildCardWithMetadata() {
	'use strict';

	function fillRSSData(data) {
		data = data || {};
		data.link = data.link || '';
		data.name = data.name || '';
		data.description = data.description || '';
		data.licenseUrl = data.licenseUrl || '';
		data.created = data.created || '';
		data.modified = data.modified || '';
		data.attribution = data.attribution || '';
		data.mail = data.mail || '';

		if ('http://creativecommons.org/licenses/by/3.0/de/' === data.licenseUrl) {
			$('#inputMetaLicenseCCBY').click();
		} else if ('http://creativecommons.org/licenses/by-sa/3.0/de/' === data.licenseUrl) {
			$('#inputMetaLicenseCCBYSA').click();
		} else {
			$('#inputMetaLicenseOther').click();
		}
		$('#inputMetaLink').val(data.link).change();
		$('#buttonOpen').attr('href', data.link);
		$('#inputMetaTitle').val(data.name).change();
		$('#inputMetaDescription').val(data.description).change();
		$('#inputMetaAttribution').val(data.attribution).change();
		$('#inputMetaMail').val(data.mail).change();
		$('#inputMetaCreated').val(data.created).change();
		$('#inputMetaUpdated').val(data.modified).change();
	}

	function fillCKANData(data, link) {
		data = data || {};
		console.log(data.result);
		data.result = data.result || {};
		data.result.title = data.result.title || '';
		data.result.notes = data.result.notes || '';
		data.result.license_id = data.result.license_id || '';
		data.result.metadata_created = data.result.metadata_created || '';
		data.result.metadata_modified = data.result.metadata_modified || '';
		data.result.maintainer = data.result.maintainer || '';
		data.result.maintainer_email = data.result.maintainer_email || '';

		if ('cc-by' === data.result.license_id) {
			$('#inputMetaLicenseCCBY').click();
		} else if ('cc-by-at-30' === data.result.license_id) {
			$('#inputMetaLicenseCCBY').click();
		} else if ('cc-by-sa' === data.result.license_id) {
			$('#inputMetaLicenseCCBYSA').click();
		} else {
			$('#inputMetaLicenseOther').click();
		}
		$('#inputMetaLink').val(link).change();
		$('#buttonOpen').attr('href', link);
		$('#inputMetaTitle').val(data.result.title).change();
		$('#inputMetaDescription').val(data.result.notes).change();
		$('#inputMetaAttribution').val(data.result.maintainer).change();
		$('#inputMetaMail').val(data.result.maintainer_email).change();
		$('#inputMetaCreated').val(data.result.metadata_created.split('T')[0]).change();
		$('#inputMetaUpdated').val(data.result.metadata_modified.split('T')[0]).change();
	}

	var url = $('#inputMetaLink').val(),
		isCKAN = false;

	if ('berlin' === config.cities[window.navigation.cityId].path) {
		url = config.cities[window.navigation.cityId].path + '/metadata.php?url=' + encodeURI(url);
	}
	if ('' === url) {
		return;
	}

	if (typeof cityConfig.data.ckan !== 'undefined') {
		isCKAN = true;
		url = url.split('/dataset/')[0] + '/api/3/action/package_show?id=' + url.split('/dataset/')[1];
	}

	$.ajax(url)
		.done(function (json) {
			if (typeof json === 'string') {
				json = $.parseJSON(json);
			}

			if (isCKAN) {
				fillCKANData(json, $('#inputMetaLink').val());
			} else {
				fillRSSData(json);
			}
		})
		.fail(function (jqXHR, textStatus) {
			if ('parsererror' === textStatus) {
				try {
					var data = $.parseJSON(jqXHR.responseText);
					if (typeof data.location !== 'undefined') {
						fillRSSData(data);
						return;
					}
				} catch (x) {
				}
			}

			if (0 === $('#inputFrontTop').val().length && 0 === $('#inputFrontMiddle').val().length && 0 === $('#inputFrontBottom').val().length) {
				$('#inputFrontTop').val(dict.editErrorTop).change();
				$('#inputFrontFormatText').click();
				$('#inputFrontMiddle').val(dict.editErrorMiddle).change();
				$('#inputFrontBottom').val(dict.editErrorBottom).change();
				$('#inputBackTop').val(dict.errorReadingCard + ' ' + url).change();
			}
		})
		.always(function () {
		});
}

//-----------------------------------------------------------------------

function fillBuildCardByOldValues(url) {
//	'use strict';

	function fillData(data) {
		data = data || {};
		data.front = data.front || {};
		data.front.textTop = data.front.textTop || '';
		data.front.textBottom = data.front.textBottom || '';
		data.front.value = data.front.value || '';
		data.front.unit = data.front.unit || '';
		data.front.changePerDay = data.front.changePerDay || '';
		data.front.format = data.front.format || '';
		data.front.background = data.front.background || '';
		data.front.color = data.front.color || '';
		data.front.cssClass = data.front.cssClass || '';
		data.back = data.back || {};
		data.back.text = data.back.text || '';
		data.back.color = data.back.color || '';
		data.back.background = data.back.background || '';
		data.back.cssClass = data.back.cssClass || '';

		if ('date' === data.front.format) {
			$('#inputFrontFormatDate').click();
		} else if ('euro' === data.front.format) {
			$('#inputFrontFormatEuro').click();
		} else if ('int' === data.front.format) {
			$('#inputFrontFormatInt').click();
		} else {
			$('#inputFrontFormatText').click();
		}
		$('#inputFrontMiddle').val(data.front.value).change();
		$('#inputFrontUnit').val(data.front.unit).change();
		$('#inputFrontChange').val(data.front.changePerDay).change();
		$('#inputFrontTop').val(data.front.textTop).change();
		$('#inputFrontBottom').val(data.front.textBottom).change();
		$('#inputBackTop').val(data.back.text).change();
		$('#buttonOpen').attr('href', data.portal.url);
		$('#inputMetaLink').val(data.portal.url).change();

		var template = config.templates[$(this).data('template')],
			elem = config.updates[0].dom.parent();

		elem.attr('style', '' === data.front.color ? '' : 'color:' + data.front.color);
		elem = elem.parent();
		$('img', elem).attr('src', data.front.background);

		elem = $('div figure.front div', config.elements[1]);
		elem.attr('style', '' === data.back.color ? '' : 'color:' + data.back.color);
		elem = elem.parent();
		elem.removeClass().addClass('front').addClass(data.back.cssClass);
	}

	$.ajax(url)
		.done(function (json) {
			if (typeof json === 'string') {
				json = $.parseJSON(json);
			}

			fillData(json);
		})
		.fail(function (jqXHR, textStatus) {
			if ('parsererror' === textStatus) {
				var data = $.parseJSON(jqXHR.responseText);
				if (typeof data.location !== 'undefined') {
					fillData(data);
					return;
				}
			}

			$('#inputFrontTop').val(dict.editErrorTop).change();
			$('#inputFrontFormatText').click();
			$('#inputFrontMiddle').val(dict.editErrorMiddle).change();
			$('#inputFrontBottom').val(dict.editErrorBottom).change();
			$('#inputBackTop').val(dict.errorReadingCard + ' ' + url).change();
		})
		.always(function () {
			fillBuildCardWithMetadata();
		});
}

//-----------------------------------------------------------------------

function fillBuildCard(obj) {
	'use strict';

	if ('new' === obj.status) {
		$('#inputFrontTop').val(obj.title).change();
		$('#inputBackTop').val(obj.description).change();
		$('#buttonOpen').attr('href', obj.link);
		$('#inputMetaLink').val(obj.link).change();

		fillBuildCardWithMetadata();
	} else {
		fillBuildCardByOldValues(obj.json);
	}
}

//-----------------------------------------------------------------------

function composeBuildCardData() {
	'use strict';

	var elem = config.updates[0].dom.parent(),
		frontColor = elem.attr('style') || '',
		frontBackground = null,
		backColor = null,
		backClass = null,
		data = {},
		license = '',
		format = '';

	if ('' !== frontColor) {
		frontColor = frontColor.split(':')[1].split(';')[0];
	}

	elem = elem.parent();
	frontBackground = $('img', elem).attr('src');

	elem = $('div figure.front div', config.elements[1]);
	backColor = elem.attr('style') || '';
	if ('' !== backColor) {
		backColor = backColor.split(':')[1].split(';')[0];
	}

	elem = elem.parent();
	backClass = elem.attr('class').split(/\s+/)[1] || '';

	data = {
		'location': {
			'country': config.cities[window.navigation.cityId].country,
			'city': config.cities[window.navigation.cityId].name
		},
		'portal': {
			'url': $('#inputMetaLink').val(),
			'title': $('#inputMetaTitle').val(),
			'description': $('#inputMetaDescription').val(),
			'license': '',
			'licenseURL': '',
			'attribution': $('#inputMetaAttribution').val(),
			'author': $('#inputMetaMail').val(),
			'created': $('#inputMetaCreated').val(),
			'updated': $('#inputMetaUpdated').val()
		},
		'front': {
			'textTop': $('#inputFrontTop').val(),
			'textBottom': $('#inputFrontBottom').val(),
			'value': $('#inputFrontMiddle').val(),
			'unit': $('#inputFrontUnit').val(),
			'changePerDay': $('#inputFrontChange').val(),
			'format': 'string',
			'background': frontBackground,
			'color': frontColor
		},
		'back': {
			'text': $('#inputBackTop').val(),
			'color': backColor,
			'cssClass': backClass
		}
	};

	license = $('#inputMetaLicense').html().split('<span')[0].trim();
	if ('CC BY' === license) {
		data.portal.license = dict.licenseCCBY;
		data.portal.licenseURL = 'http://creativecommons.org/licenses/by/3.0/de/';
	} else if ('CC BY-SA' === license) {
		data.portal.license = dict.licenseCCBYSA;
		data.portal.licenseURL = 'http://creativecommons.org/licenses/by-sa/3.0/de/';
	}

	format = $('#inputFrontFormat').html().split('<span')[0].trim();
	if (dict.formatTitleDate === format) {
		data.front.format = 'date';
	} else if (dict.formatTitleCurrency === format) {
		data.front.format = 'euro';
	} else if (dict.formatTitleInt === format) {
		data.front.format = 'int';
	} else if (dict.formatTitleString === format) {
		data.front.format = 'string';
	}

	return data;
}

//-----------------------------------------------------------------------

function buildCards(cardObj) {
//	'use strict';

	function downloadBuildCardToJSON() {
		var data = composeBuildCardData(),
			filename = data.portal.url.split('/'),
			str = '',
			uri = '',
			link = null;

		filename = filename[filename.length - 1];
		filename = filename.replace(/%C3%A4/g, 'ae');
		filename = filename.replace(/%C3%B6/g, 'oe');
		filename = filename.replace(/%C3%BC/g, 'ue');
		filename = filename.replace(/%C3%9F/g, 'ss');
		filename += '.json';

		str = JSON.stringify(data, null, '\t');
		str = unescape(encodeURIComponent(str));
		uri = 'data:text/json;charset=utf-8;base64,' + btoa(str);

		link = document.createElement('a');
		link.download = filename;
		link.href = uri;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		delete link;
	}

	function uploadBuildCard() {
		function showMessage(success) {
			if (success) {
				$('#saveAlert')
					.html(dict.alertSavedInternet)
					.addClass('alert')
					.addClass('alert-success')
					.removeClass('alert-danger');
			} else {
				$('#saveAlert')
					.html(dict.alertErrorInternet)
					.addClass('alert')
					.removeClass('alert-success')
					.addClass('alert-danger');
			}
		}

		var data = composeBuildCardData(),
			filename = data.portal.url.split('/'),
			str = '',
			url = '';

		filename = filename[filename.length - 1];
		filename = filename.replace(/%C3%A4/g, 'ae');
		filename = filename.replace(/%C3%B6/g, 'oe');
		filename = filename.replace(/%C3%BC/g, 'ue');
		filename = filename.replace(/%C3%9F/g, 'ss');
		filename += '.json';

		str = JSON.stringify(data, null, '\t');

		url = 'scripts/mail.php';
		url += '?city=' + config.cities[window.navigation.cityId].path;
		url += '&filename=' + filename;
		url += '&file=' + encodeURIComponent(str);
		$.ajax(url)
			.done(function (json) {
				if (typeof json === 'string') {
					json = $.parseJSON(json);
				}

				showMessage('success' === json.status);
			})
			.fail(function (jqXHR, textStatus) {
				if ('parsererror' === textStatus) {
					var data = $.parseJSON(jqXHR.responseText);
					if (typeof data.location !== 'undefined') {
						showMessage('success' === data.status);
						return;
					}
				}
				showMessage(false);
			});
	}

	/*
	function saveBuildCardToJSON() {
		'use strict';

		window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
		if (typeof window.requestFileSystem === 'undefined') {
			return;
		}

		var data = composeBuildCardData(),
			filesize = data.length * 1.2;

		navigator.webkitPersistentStorage.requestQuota(filesize, function () {
			window.requestFileSystem(window.PERSISTENT, filesize, function (localstorage) {
				console.log('here');
				console.log(localstorage);
				localstorage.root.getFile('info.txt', {create: true}, function(file) {
					console.log('here not');
					file.createWriter(function(content) {
						content.write(data);

						console.log('ready');
					});
				});
			});
		});

		// http://www.noupe.com/design/html5-filesystem-api-create-files-store-locally-using-javascript-webkit.html
	}
	*/

	var front = dict.editDummyLongText + '<br><span>' + dict.editDummyShortText + '</span><br>' + dict.editDummyLongText,
		frontTextColor = 'color:white;',
		frontBGImage = 'img/blueprintcard.svg',
		frontCSSClass = '',
		back = dict.editDummyDescription,
		backTextColor = 'color:black;',
		backBGImage = '',
		backCSSClass = '',
		elem = null,
		theme = null,
		str = '',
		i = 0;

	createNewCard({
		front: {text: front, image: frontBGImage, style: frontTextColor, css: frontCSSClass + ' display'},
		data: {value: dict.editDummyShortText, unit: '', change: 1, formatter: stringValueFormatter}
	});
	createNewCard({
		back: {text: back, image: backBGImage, style: backTextColor, css: backCSSClass, url: 'foo'}
	});

	elem = $('div', config.elements[config.elements.length - 1]);
	elem.addClass('flipped');

	str += '<br>';

	// begin template themes
	str += '<div class="panel panel-info">';
	str += '<div class="panel-heading"><h3 class="panel-title">' + dict.editTemplates + '</h3></div>';
	str += '<div class="panel-body">';
	str += '<div class="row row-horizon">';

	for (i = 0; i < config.templates.length; ++i) {
		theme = config.templates[i];

		str += '<div class="col-xs-3 col-md-2">';
		str += '<a href="#" class="thumbnail" data-template="' + i + '"><img src="' + theme.frontBackground + '" alt=""></a>';
		str += '</div>';
	}

	str += '</div>';
	str += '</div>';
	str += '</div>';
	// end template themes

	str += '<div class="row">';
	// left 'front card side'
	str += '<div class="col-sm-6">';
	str += '<div class="panel panel-info">';
	str += '<div class="panel-heading"><h3 class="panel-title">' + dict.editFace + '</h3></div>';
	str += '<div class="panel-body">';
	// top
	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">' + dict.editTextTop + '</span>';
	str += '<input type="text" class="form-control" id="inputFrontTop" placeholder="' + dict.editDummyLongText + '" aria-describedby="basic-addon1">';
	str += '</div>';
	str += '<br>';
	// middle (first line)
	str += '<div class="row">';

	str += '<div class="col-sm-8">';
	str += '<div class="input-group">';

	str += '<div class="input-group-btn">';
	str += '<button class="btn btn-default dropdown-toggle" type="button" id="inputFrontFormat" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
	str += dict.formatTitleString + ' <span class="caret"></span></button>';
	str += '<ul class="dropdown-menu">';
	str += '<li><a href="#" id="inputFrontFormatText">' + dict.formatTitleString + '</a></li>';
	str += '<li><a href="#" id="inputFrontFormatInt">' + dict.formatTitleInt + '</a></li>';
	str += '<li><a href="#" id="inputFrontFormatEuro">' + dict.formatTitleCurrency + '</a></li>';
	str += '<li><a href="#" id="inputFrontFormatDate">' + dict.formatTitleDate + '</a></li>';
	str += '</ul>';
	str += '</div>';

	str += '<input type="text" class="form-control" id="inputFrontMiddle" placeholder="' + dict.editDummyShortText + '" aria-describedby="basic-addon1">';

	str += '</div>';
	str += '</div>';

	str += '<div class="col-sm-4">';
	str += '<div class="input-group">';
	str += '<input type="text" class="form-control" id="inputFrontUnit" placeholder="' + dict.editTextUnit + '" aria-describedby="basic-addon1">';
	str += '</div>';
	str += '</div>';

	str += '</div>';
	// middle (second line)
	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">' + dict.editTextChange + '</span>';
	str += '<input type="text" class="form-control" id="inputFrontChange" placeholder="' + dict.editDummyLongNumber + '" aria-describedby="basic-addon1">';
	str += '</div>';
	str += '<br>';
	// bottom
	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">' + dict.editTextBottom + '</span>';
	str += '<input type="text" class="form-control" id="inputFrontBottom" placeholder="' + dict.editDummyLongText + '" aria-describedby="basic-addon1">';
	str += '</div>';
	str += '</div>';
	str += '</div>';
	str += '</div>';
	// right 'back card side'
	str += '<div class="col-sm-6">';
	str += '<div class="panel panel-info">';
	str += '<div class="panel-heading"><h3 class="panel-title">' + dict.editSource + '</h3></div>';
	str += '<div class="panel-body" style="text-align:center;">';
	// content
	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">' + dict.editLink + '</span>';
	str += '<input type="text" class="form-control" id="inputMetaLink" placeholder="' + dict.editTextLink + '" aria-describedby="basic-addon1">';
	str += '<span class="input-group-btn">';
	str += '<a href="#" class="btn btn-primary" type="button" id="buttonOpen" target="_blank">' + dict.editButtonLink + '</a>';
	str += '</span>';
	str += '</div>';
	str += '</div>';
	str += '</div>';
	str += '<div class="panel panel-info">';
	str += '<div class="panel-heading"><h3 class="panel-title">' + dict.editBack + '</h3></div>';
	str += '<div class="panel-body">';
	// content
	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">' + dict.editTextBack + '</span>';
	str += '<input type="text" class="form-control" id="inputBackTop" placeholder="' + dict.editTextBackLong + '" aria-describedby="basic-addon1">';
	str += '</div>';
	str += '</div>';
	str += '</div>';
	str += '</div>';
	// end 'back card side'
	str += '</div>';

	// begin metadata
	str += '<div class="panel panel-info">';
	str += '<div class="panel-heading"><h3 class="panel-title">' + dict.editMetadata + '</h3></div>';
	str += '<div class="panel-body">';
	// content
	str += '<div class="row">';
	// left side
	str += '<div class="col-sm-6">';

	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">' + dict.editTitle + '</span>';
	str += '<input type="text" class="form-control" id="inputMetaTitle" placeholder="' + dict.editTitleLong + '" aria-describedby="basic-addon1">';
	str += '</div>';
	str += '<br>';

	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">' + dict.editDescription + '</span>';
	str += '<input type="text" class="form-control" id="inputMetaDescription" placeholder="' + dict.editDescriptionLong + '" aria-describedby="basic-addon1">';
	str += '</div>';
	str += '<br>';

	str += '<div class="row">';
	str += '<div class="col-sm-7">';

	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">' + dict.editAuthor + '</span>';
	str += '<input type="text" class="form-control" id="inputMetaAttribution" placeholder="' + dict.editAuthorLong + '" aria-describedby="basic-addon1">';
	str += '</div>';

	str += '</div>';
	str += '<div class="col-sm-5">';

	str += '<input type="text" class="form-control" id="inputMetaMail" placeholder="' + dict.editTextMail + '" aria-describedby="basic-addon1">';

	str += '</div>';
	str += '</div>';

	str += '</div>';
	// right side
	str += '<div class="col-sm-6">';

	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">' + dict.editLicense + '</span>';
	str += '<div class="input-group-btn">';
	str += '<button class="btn btn-default dropdown-toggle" type="button" id="inputMetaLicense" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
	str += dict.licenseOther + ' <span class="caret"></span></button>';
	str += '<ul class="dropdown-menu">';
	str += '<li><a href="#" id="inputMetaLicenseCCBY">CC BY, ' + dict.licenseCCBY + '</a></li>';
	str += '<li><a href="#" id="inputMetaLicenseCCBYSA">CC BY-SA, ' + dict.licenseCCBYSA + '</a></li>';
	str += '<li><a href="#" id="inputMetaLicenseOther">' + dict.licenseOther + '</a></li>';
	str += '</ul>';
	str += '</div>';
	str += '</div>';
	str += '<br>';

	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">' + dict.editCreated + '</span>';
	str += '<input type="text" class="form-control" id="inputMetaCreated" placeholder="' + dict.editCreatedLong + '" aria-describedby="basic-addon1">';
	str += '</div>';
	str += '<br>';

	str += '<div class="input-group">';
	str += '<span class="input-group-addon" id="basic-addon1">' + dict.editModified + '</span>';
	str += '<input type="text" class="form-control" id="inputMetaUpdated" placeholder="' + dict.editModifiedLong + '" aria-describedby="basic-addon1">';
	str += '</div>';

	str += '</div>';
	str += '</div>';
	str += '</div>';
	str += '</div>';
	// end metadata

	// action buttons
	str += '<div class="panel panel-info">';
	str += '<div class="" role="alert" id="saveAlert"></div>';
	str += '<div class="panel-body dropup" style="text-align:left;">';
	str += '<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" id="inputButtonDownload" aria-haspopup="true" aria-expanded="false">';
	str += dict.editButtonSave + ' <span class="caret"></span></button>';
	str += '<ul class="dropdown-menu">';
	str += '<li><a href="#inputButtonDownload" id="inputButtonUploadJSON">' + dict.editButtonSaveInternet + '</a></li>';
	str += '<li><a href="#inputButtonDownload" id="inputButtonDownloadJSON">' + dict.editButtonSaveJSON + '</a></li>';
//	str += '<li><a href="#inputButtonDownload" id="inputButtonSaveJSON">Lokal speichern</a></li>';
	str += '</ul>';

	str += '&nbsp;&nbsp;&nbsp;';
	str += '<button class="btn btn-default" type="button" id="inputButtonCancel">' + dict.editButtonClose + '</button>';
	str += '</div>';
	str += '</div>';

	$('#build').html(str);

	function setFormat(buttonText, placeholder, formatter) {
		config.updates[0].formatter = formatter;
		$('#inputFrontFormat').html(buttonText + ' <span class="caret"></span>');
		$('#inputFrontMiddle').attr('placeholder', placeholder);
	}

	$('#inputFrontMiddle').change(function () {
		config.updates[0].value = $(this).val();
	});
	$('#inputFrontUnit').change(function () {
		config.updates[0].unit = $(this).val();
	});
	$('#inputFrontChange').change(function () {
		config.updates[0].change = $(this).val();
	});
	$('#inputFrontFormatText').click(function () {
		setFormat(dict.formatTitleString, dict.editDummyShortText, stringValueFormatter);
	});
	$('#inputFrontFormatInt').click(function () {
		setFormat(dict.formatTitleInt, dict.editDummyShortNumber, intValueFormatter);
	});
	$('#inputFrontFormatEuro').click(function () {
		setFormat(dict.formatTitleCurrency, dict.editDummyShortCurrency, euroValueFormatter);
	});
	$('#inputFrontFormatDate').click(function () {
		setFormat(dict.formatTitleDate, dict.editDummyShortDate, dateValueFormatter);
	});
	$('#inputFrontTop').change(function () {
		var elem = config.updates[0].dom.parent(),
			arr = elem.html().split('<span>');

		elem.html($(this).val() + '<br><span>' + arr[1]);
		config.updates[0].dom = $('span', elem);
	});
	$('#inputFrontBottom').change(function () {
		var elem = config.updates[0].dom.parent(),
			arr = elem.html().split('</span>');

		elem.html(arr[0] + '</span><br>' + $(this).val());
		config.updates[0].dom = $('span', elem);
	});
	$('#inputBackTop').change(function () {
		var elem = $('div figure.back div', config.elements[1]);
		$(elem[0]).html($(this).val());
	});
	$('a.thumbnail').click(function () {
		var template = config.templates[$(this).data('template')],
			elem = config.updates[0].dom.parent();

		elem.attr('style', '' === template.frontColor ? '' : 'color:' + template.frontColor);
		elem = elem.parent();
		$('img', elem).attr('src', template.frontBackground);

		elem = $('div figure.front div', config.elements[1]);
		elem.attr('style', '' === template.backColor ? '' : 'color:' + template.backColor);
		elem = elem.parent();
		elem.removeClass().addClass('front').addClass(template.backClass);

		return false;
	});
	$('#inputMetaLicenseCCBY').click(function () {
		$('#inputMetaLicense').html('CC BY <span class="caret"></span>');
	});
	$('#inputMetaLicenseCCBYSA').click(function () {
		$('#inputMetaLicense').html('CC BY-SA <span class="caret"></span>');
	});
	$('#inputMetaLicenseOther').click(function () {
		$('#inputMetaLicense').html(dict.licenseOther + ' <span class="caret"></span>');
	});
	$('#inputButtonDownloadJSON').click(function () {
		downloadBuildCardToJSON();
	});
	$('#inputButtonUploadJSON').click(function () {
		uploadBuildCard();
	});
//	$('#inputButtonSaveJSON').click(function () {
//		saveBuildCardToJSON();
//	});
	$('#inputButtonCancel').click(function () {
		resetCards(false);
		config.loadBuildList = true;
		getUpdates(cityConfig.data.feed, cityConfig.data.ckan);
	});

//	window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
//	if(typeof window.requestFileSystem  == 'undefined') {
//		$('#inputButtonSaveJSON').addClass('disabled');
//	}

	fillBuildCard(cardObj);
}

//-----------------------------------------------------------------------
