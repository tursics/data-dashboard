/*jslint browser: true*/
/*global console,$,Idle,config,dict,cityConfig*/

//-----------------------------------------------------------------------

function stringValueFormatter(startValue, changePerDay, unit, seconds) {
	'use strict';

	return startValue + ' ' + unit;
}

//-----------------------------------------------------------------------

function dateValueFormatter(startValue, changePerDay, unit, seconds) {
	'use strict';

	var usedUnit = dict.formatUnitDays,
		d1 = new Date(),
		d2 = new Date(startValue),
		diff = (d2 - d1) / 1000 / 60 / 60 / 24,
		value = '';

	if ('Tagen' === unit) {
		usedUnit = dict.formatUnitOnDays;
	} else if ('Tage' === unit) {
		usedUnit = dict.formatUnitDays;
	}

	if (diff < 0) {
		diff = -diff;
	}

	if (diff < 1) {
		value = '- ' + usedUnit;
	} else if (diff < 2) {
		value = '1 ' + dict.formatUnitDays;
	} else {
		value = parseInt(diff, 10) + ' ' + usedUnit;
	}

	return value;
}

//-----------------------------------------------------------------------

function dateTimeValueFormatter(startValue, changePerDay, unit, seconds) {
	'use strict';

	var d1 = new Date(),
		d2 = new Date(startValue),
		diff = (d2 - d1) / 1000 / 60,
		value = '';

	if (diff < 0) {
		diff = -diff;
	}

	value = parseInt(diff, 10) + ' ' + unit;

	return value;
}

//-----------------------------------------------------------------------

function largeValueFormatter(value) {
	'use strict';

	value = parseInt(value, 10);

	if (value > 1000) {
		value = value.toString();
		if (value.length > 3) {
			value = value.substr(0, value.length - 3) + dict.formatThousandDot + value.substr(-3);
		}
		if (value.length > 11) {
			value = parseInt(parseInt(value.substr(0, value.length - 4), 10) / 1000000, 10);
			value = value.toString();
			value = value + ' ' + dict.formatBillionsShort + ' ';
		} else if (value.length > 10) {
			value = parseInt(parseInt(value.substr(0, value.length - 4), 10) / 100000, 10);
			value = value.toString();
			value = value.substr(0, value.length - 1) + dict.formatDecimal + value.substr(-1) + ' ' + dict.formatBillionsShort + ' ';
		} else if (value.length > 8) {
			value = parseInt(parseInt(value.substr(0, value.length - 4), 10) / 1000, 10);
			value = value.toString();
			value = value + ' ' + dict.formatMillionShort + ' ';
		} else if (value.length > 7) {
			value = parseInt(parseInt(value.substr(0, value.length - 4), 10) / 100, 10);
			value = value.toString();
			value = value.substr(0, value.length - 1) + dict.formatDecimal + value.substr(-1) + ' ' + dict.formatMillionShort + ' ';
		}
	}
	return value;
}

//-----------------------------------------------------------------------

function intValueFormatter(startValue, changePerDay, unit, seconds) {
	'use strict';

	var value = startValue;
	if ('' === value) {
		value = 0;
	}
	if (0 < parseInt(changePerDay, 10)) {
		value = seconds * changePerDay / 24 / 60 / 60;
	}
	value = largeValueFormatter(parseInt(value, 10));

	return value + ' ' + unit;
}

//-----------------------------------------------------------------------

function euroValueFormatter(startValue, changePerDay, unit, seconds) {
	'use strict';

	var value = startValue;
	if (0 < changePerDay) {
		value = seconds * changePerDay / 24 / 60 / 60;
	}

	if (value < 1000) {
		value = parseInt(value * 100, 10);
		value = value.toString();
		while (value.length < 3) {
			value = '0' + value;
		}
		value = value.substr(0, value.length - 2) + dict.formatDecimal + value.substr(-2);
	} else {
		value = largeValueFormatter(parseInt(value, 10));
	}
	return value + ' ' + unit;
}

//-----------------------------------------------------------------------

function createNewCard(card) {
//	'use strict';

	card = card || {};
	card.front = card.front || {};
	card.front.css = card.front.css || '';
	card.front.image = card.front.image || '';
	card.front.style = card.front.style || '';
	card.front.text = card.front.text || '';
	card.front.flipped = card.front.flipped || false;
	card.back = card.back || {};
	card.back.css = card.back.css || '';
	card.back.image = card.back.image || '';
	card.back.style = card.back.style || '';
	card.back.text = card.back.text || '';
	card.back.url = card.back.url || '';
	card.data = card.data || {};
	card.data.value = card.data.value || '';
	card.data.unit = card.data.unit || '';
	card.data.change = card.data.change || 0;
	card.data.formatter = card.data.formatter || function () { return ''; };

//	<i class="dashboardicon animate-spin">&#xe801;</i>

	var button = '<div class="buttonbar">',
		style = '',
		str = '',
		cardwrapper = null;

	button += '<button type="button" class="btn btn-primary btn-flipp"><i class="dashboardicon">&#xe805;</i></button>';
	if ('' !== card.back.url) {
		button += '<button type="button" class="btn btn-primary btn-data" data-url="' + card.back.url + '"><i class="dashboardicon">&#xe809;</i></button>';
	}
	button += '</div>';

	if ('' !== card.front.image) {
		card.front.css = 'transparent ' + card.front.css;
		card.front.text = '<img src="' + card.front.image + '" class="background"><div style="pointer-events: none;' + card.front.style + '">' + card.front.text + '</div>';
	} else {
		card.front.text = '<div style="' + card.front.style + '">' + card.front.text + '</div>';
	}
	if ('' !== card.back.image) {
		card.back.css = 'transparent';
		card.back.text = '<img src="' + card.back.image + '" class="background">';
	} else {
		card.back.text = '<div style="' + card.back.style + '">' + card.back.text + '</div>' + button;
	}

	style = card.front.flipped ? ' style="display:none;" ' : '';
	str = '<div class="cardwrapper"><figure class="front ' + card.front.css + '"' + style + '>' + card.front.text + '</figure><figure class="back ' + card.back.css + '"' + style + '>' + card.back.text + '</figure></div>';

	cardwrapper = $('<section>', {
		class: 'card',
		html: str
	})
		.insertBefore('section.endcard')
		.children().first();

	$('.front', cardwrapper).click(function () {
		if (!$('body').hasClass('build')) {
			$(this).parent().toggleClass('flipped');
		}
	});
	$('.back .btn-flipp', cardwrapper).click(function () {
		if (!$('body').hasClass('build')) {
			$(this).parent().parent().parent().toggleClass('flipped');
		}
	});
	$('.back .btn-data', cardwrapper).click(function () {
		if (!$('body').hasClass('build')) {
			var url = $(this).data('url'),
				link = document.createElement('a');

			link.href = url;
			link.target = '_blank';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			delete link;
		}
	});

	config.elements.push($('section:nth-last-child(2)'));
	if (card.data.change > 0) {
		config.updates.push({
			dom: $('section:nth-last-child(2) div figure.front span'),
			value: card.data.value,
			change: card.data.change,
			unit: card.data.unit,
			formatter: card.data.formatter
		});
	}
}

//-----------------------------------------------------------------------

function recalcBoard() {
	'use strict';

	$(window).trigger('resize');
}

//-----------------------------------------------------------------------

function loadCards() {
	'use strict';

	function createCard(data) {
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
		data.portal = data.portal || {};
		data.portal.url = data.portal.url || '';

		if (typeof data[dict.appLang] !== 'undefined') {
			var local = data[dict.appLang];
			data.front.textTop = local.front.textTop || data.front.textTop;
			data.front.textBottom = local.front.textBottom || data.front.textBottom;
			data.front.value = local.front.value || data.front.value;
			data.back.text = local.back.text || data.back.text;
		}

		var value = data.front.value + ' ' + data.front.unit,
			valueFormatter = stringValueFormatter,
			front = '',
			frontTextColor = 'color:' + data.front.color + ';',
			frontBGImage = data.front.background,
			frontCSSClass = data.front.cssClass,
			back = data.back.text,
			backTextColor = 'color:' + data.back.color + ';',
			backBGImage = data.back.background,
			backCSSClass = data.back.cssClass,
			changePerDay = data.front.changePerDay;

		if ('date' === data.front.format) {
			valueFormatter = dateValueFormatter;
			value = valueFormatter(data.front.value, 0, data.front.unit, 0);
		} else if ('datetime' === data.front.format) {
			valueFormatter = dateTimeValueFormatter;
			value = valueFormatter(data.front.value, 0, data.front.unit, 0);
		} else if ('euro' === data.front.format) {
			valueFormatter = euroValueFormatter;
			value = valueFormatter(data.front.value, 0, data.front.unit, 0);
		} else if ('int' === data.front.format) {
			valueFormatter = intValueFormatter;
			value = valueFormatter(data.front.value, 0, data.front.unit, 0);
		}
		front = data.front.textTop + '<br><span>' + value + '</span><br>' + data.front.textBottom;

		createNewCard({
			front: {text: front, image: frontBGImage, style: frontTextColor, css: frontCSSClass + ' display', flipped: true},
			back: {text: back, image: backBGImage, style: backTextColor, css: backCSSClass, url: data.portal.url},
			data: {value: data.front.value, unit: data.front.unit, change: changePerDay, formatter: valueFormatter}
		});
	}

	if ((typeof cityConfig.cards !== 'undefined') && (config.loaded < cityConfig.cards.length)) {
		var url = cityConfig.cards[config.loaded];
		$.ajax(url)
			.done(function (json) {
				try {
					if (typeof json === 'string') {
						json = $.parseJSON(json);
					}
					createCard(json);
				} catch (e1) {
					try {
						if ((typeof cityConfig.meta.uri !== 'undefined') && !url.startsWith(cityConfig.meta.uri)) {
							cityConfig.cards[config.loaded] = cityConfig.meta.uri + url;
							--config.loaded;
							return;
						}
					} catch (e2) {
					}

					console.log(e1.message);
					createNewCard({
						front: {text: e1.message, css: 'card1line', flipped: true},
						back: {text: dict.errorReadingCard + ' ' + url, css: ''}
					});
				}
			})
			.fail(function (jqXHR, textStatus) {
				if ('parsererror' === textStatus) {
					try {
						var data = $.parseJSON(jqXHR.responseText);
						if (typeof data.location !== 'undefined') {
							createCard(data);
							return;
						}
					} catch (e1) {
						try {
							if ((typeof cityConfig.meta.uri !== 'undefined') && !url.startsWith(cityConfig.meta.uri)) {
								cityConfig.cards[config.loaded] = cityConfig.meta.uri + url;
								--config.loaded;
								return;
							}
						} catch (e2) {
						}
					}
				}
				createNewCard({
					front: {text: textStatus, css: 'card1line', flipped: true},
					back: {text: dict.errorReadingCard + ' ' + url, css: ''}
				});
			})
			.always(function () {
				var speed = 300,
					elem = $('div', config.elements[config.elements.length - 1]);

				recalcBoard();

				$('body').waitForImages(function () {
					elem.addClass('flipped');

					window.setTimeout(function () {
						if (config.loadCityCards) {
							++config.loaded;
							loadCards();

							window.setTimeout(function () {
								elem.removeClass('flipped');

								window.setTimeout(function () {
									$('figure', elem).css('display', 'block');
								}, speed / 2);
							}, speed / 2);
						}
					}, speed / 2);
				});
			});
	}
}

//-----------------------------------------------------------------------

function installInternationalization() {
	'use strict';

	window.dict = window.dict || gDict.de;
//	window.dict = window.dict || gDict.en;
//	window.dict = window.dict || gDict.nl;
}

//-----------------------------------------------------------------------

function resetCards(clearFeed) {
	'use strict';

	var i = 0,
		element = null;

	$('#build').html('');

	config.elements = config.elements || [];

	for (i = 0; i < config.elements.length; ++i) {
		element = config.elements[i];
		element.remove();
	}

	config.loaded = 0;
	config.loadCityCards = false;
	config.loadLicenses = false;
	config.loadBuildList = false;
	config.elements = [];
	config.updates = [];

	if (clearFeed) {
		config.feed = [];
	}
}

//-----------------------------------------------------------------------

function installNavigation() {
	'use strict';

	var initPage = false;

	function loadNavigation() {
		var queries = location.search.replace(/^\?/, '').split('&'),
			params = {},
			i = 0,
			split = [];

		for (i = 0; i < queries.length; ++i) {
			split = queries[i].split('=');
			params[split[0]] = split[1];
		}

		window.navigation.cityId = 0;
		window.navigation.city = config.cities[0].path;
		if (typeof params.city !== 'undefined') {
			for (i = 0; i < config.cities.length; ++i) {
				if (params.city === config.cities[i].path) {
					window.navigation.cityId = i;
					window.navigation.city = params.city;
					break;
				}
			}
		}

		if (typeof params.page !== 'undefined') {
			window.navigation.page = params.page;
		}
		if (-1 === $.inArray(window.navigation.page, ['cards', 'about', 'build'])) {
			window.navigation.page = 'cards';
		}

		if ((typeof params.lang !== 'undefined') && (2 === params.lang.length)) {
			window.navigation.lang = params.lang;
			window.dict = gDict[params.lang] || window.dict;
		}
	}

	function saveNavigation(pushHistory) {
		var url = '?city=' + window.navigation.city;
		url += '&page=' + window.navigation.page;

		if (typeof window.navigation.lang !== 'undefined') {
			url += '&lang=' + window.navigation.lang;
		}

		try {
			if (pushHistory) {
				window.history.pushState({}, '', url);
			} else {
				window.history.replaceState({}, '', url);
			}
		} catch (e) {
			console.log(e);
		}
	}

	window.navigation = window.navigation || {
		city: '',
		cityId: 0,
		page: '',
		useFileSystem: false,
		replaceURI: function () {
			saveNavigation(false);
		},
		showPage: function (pageName) {
			if (!initPage) {
				initPage = true;
			} else if (pageName === this.page) {
				return;
			}

			this.page = pageName;

			if ('cards' === pageName) {
				$('#menuPageCards').parent().addClass('active');
			} else {
				$('#menuPageCards').parent().removeClass('active');
			}

			if ('about' === pageName) {
				$('#menuPageAbout').parent().addClass('active');
			} else {
				$('#menuPageAbout').parent().removeClass('active');
			}

			if ('build' === pageName) {
				$('body').addClass('build');
			} else {
				$('body').removeClass('build');
			}

			if ('cards' === pageName) {
				window.navigation.replaceURI();

				resetCards(true);
				$('body').waitForImages(function () {
					config.loadCityCards = true;
					loadCards();
				});
			} else if ('about' === pageName) {
				window.navigation.replaceURI();

				resetCards(true);
				$('body').waitForImages(function () {
					config.loadLicenses = true;
					about();
				});
			} else if ('build' === pageName) {
				window.navigation.replaceURI();

				resetCards(true);
				$('body').waitForImages(function () {
					config.loadBuildList = true;
					getUpdates(cityConfig.data.feed, cityConfig.data.ckan);
				});
			} else {
				console.log('Page "' + pageName + '" does not exist');
			}
		}
	};

	loadNavigation();
	window.navigation.useFileSystem = (0 === location.href.indexOf('file://'));
	window.navigation.replaceURI();
}

//-----------------------------------------------------------------------

function installCity(callbackFunc) {
//	'use strict';

	cityConfig = {};

	var url = window.navigation.city;
//	if(window.navigation.useFileSystem) {
//		url = location.href.substr(0, location.href.lastIndexOf('/')) + '/' + url;
//	}

	url += '/cityConfig.json';
	$.ajax(url)
		.done(function (json) {
			if (typeof json === 'string') {
				json = $.parseJSON(json);
			}
			cityConfig = json;
		})
		.fail(function (jqXHR, textStatus) {
			if ('parsererror' === textStatus) {
				try {
					var data = $.parseJSON(jqXHR.responseText);
					if (typeof data.meta !== 'undefined') {
						cityConfig = data;
						return;
					}
				} catch (e) {
				}
			}
			console.log(dict.errorReadingCard + ' "' + url + '"');
		})
		.always(function () {
			callbackFunc();
		});
}

//-----------------------------------------------------------------------

function installBackground() {
	'use strict';

	if ((typeof cityConfig.meta !== 'undefined') && (typeof cityConfig.meta.background !== 'undefined')) {
		$('body').css('background-image', 'url(' + cityConfig.meta.background + ')');
	}
}

//-----------------------------------------------------------------------

function installMenu() {
	'use strict';

	var brandTitle = dict.brandTitle,
		str = '',
		strMail = '',
		strTwitter = '',
		strGithub = '',
		citylist = '',
		portallist = '',
		i = 0,
		citydata = {},
		badge = '';

	document.title = brandTitle;

	str = $('.navbar-header').html();
	str += '<span class="navbar-brand">' + brandTitle + '</span>';
	$('.navbar-header').html(str);

	str = '';
	str += '<ul class="nav navbar-nav">';

	if (typeof cityConfig.meta === 'undefined') {
		strMail = 'thomas@tursics.de';
		strTwitter = 'https://twitter.com/tursics/';
		strGithub = 'https://github.com/tursics/data-dashboard/';

		$('.container .alert')
			.html(dict.errorNoCityInfo)
			.addClass('alert-danger')
			.css('display', '');
	} else {
		strMail = cityConfig.meta.mail;
		strTwitter = cityConfig.meta.twitter;
		strGithub = cityConfig.meta.github;

		str += '<li><a id="menuPageCards" href="#">' + dict.menuCards + '</a></li>';
//		str += '<li class="disabled"><a id="menuPageSpread" href="#spread">Verteilung</a></li>';
		str += '<li><a id="menuPageAbout" href="#">' + dict.menuInfo + '</a></li>';

		if (cityConfig.meta.showMenuCity && (config.cities.length > 1)) {
			for (i = 0; i < config.cities.length; ++i) {
				citydata = config.cities[i];
				badge = '';
				if (('' !== citydata.badge) && ('Released' !== citydata.badge)) {
					badge = ' <span class="label label-success">' + citydata.badge + '</span>';
				}
				if ('city' === citydata.group) {
					citylist += '<li><a href="./index.html?city=' + citydata.path + '">' + citydata.name + badge + '</a></li>';
				} else if ('portal' === citydata.group) {
					portallist += '<li><a href="./index.html?city=' + citydata.path + '">' + citydata.name + badge + '</a></li>';
				}
			}

			str += '<li class="dropdown">';
			str += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + config.cities[window.navigation.cityId].name + ' <span class="caret"></span></a>';
			str += '<ul class="dropdown-menu">';
			if (citylist.length > 0) {
				str += '<li class="dropdown-header">' + dict.menuCities + '</li>';
				str += citylist;
			}
			if (portallist.length > 0) {
				str += '<li role="separator" class="divider"></li>';
				str += '<li class="dropdown-header">' + dict.menuPortals + '</li>';
				str += portallist;
			}
			str += '</ul>';
			str += '</li>';
		}

		badge = config.cities[window.navigation.cityId].badge;
		if ('Alpha' === badge) {
			$('.container .alert')
				.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + dict.alertAlpha)
				.addClass('alert-warning')
				.css('display', '');
		} else if ('Beta' === badge) {
			$('.container .alert')
				.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + dict.alertBeta)
				.addClass('alert-info')
				.css('display', '');
		} else {
			$('.container .alert')
				.html(dict.alertReleased)
				.addClass('alert-warning')
				.css('display', '');
		}
	}

	str += '</ul>';

	str += '<ul class="nav navbar-nav navbar-right">';
	str += '<li><a href="mailto:' + strMail + '"><i class="dashboardicon">&#xe808;</i>'/* + dict['menuMail']*/ + '</a></li>';
	str += '<li><a href="' + strTwitter + '" target="_blank"><i class="dashboardicon">&#xe807;</i>'/* + dict['menuTwitter']*/ + '</a></li>';
	if (typeof cityConfig.meta !== 'undefined') {
		str += '<li class="dropdown">';
		str += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + dict.menuAssist + ' <span class="caret"></span></a>';
		str += '<ul class="dropdown-menu">';
		str += '<li><a href="' + strGithub + '" target="_blank"><i class="dashboardicon">&#xe806;</i> ' + dict.menuGithub + '</a></li>';
		str += '<li><a id="menuPageBuild" href="#"><i class="dashboardicon">&#xe804;</i> ' + dict.menuEdit + '</a></li>';
		str += '</ul>';
		str += '</li>';
	}
	str += '</ul>';

	$('#navbar').html(str);

	$('#menuPageCards').click(function () {
		window.navigation.showPage('cards');
//		return false;
	});
	$('#menuPageAbout').click(function () {
		window.navigation.showPage('about');
//		return false;
	});
	$('#menuPageBuild').click(function () {
		window.navigation.showPage('build');
//		return false;
	});
}

//-----------------------------------------------------------------------

function installEvents() {
	'use strict';

	var resizeTimer;

	function recalcPositions() {
		var elements = $('#board').children(),
			lastTop,
			e = null,
			i = 0,
			top = 0,
			y = 0;

		for (i = 0; i < (elements.length - 1); ++i) {
			e = $(elements[i]);
			top = parseInt(e.position().top, 10);
			if ((0 === i) || (lastTop === top)) {
				e.css('margin-left', '0');
			} else {
				++y;
				e.css('margin-left', y % 2 ? '6.55em' : '0');
			}
			lastTop = top;
		}
	}

	$(window).resize(function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(recalcPositions, 50);
	});
}

//-----------------------------------------------------------------------

function installTimer() {
	'use strict';

	var startTime = (new Date()).getTime(),
		delay = 100;

	function timerFunc() {
		try {
			var diffTime = parseInt(((new Date()).getTime() - startTime) / 1000, 10),
				i = 0,
				update = {};

			for (i = 0; i < config.updates.length; ++i) {
				update = config.updates[i];
				update.dom.text(update.formatter(update.value, update.change, update.unit, diffTime));
			}
		} catch (e) {
//			console.log(e);
		}

		setTimeout(timerFunc, delay);
	}

	setTimeout(timerFunc, delay);
}

//-----------------------------------------------------------------------

function installSlideshow() {
	'use strict';

	var flipElem = null,
		flipTimer = null,
		startSpeed = 60 * 1000,
		waitSpeed = 10 * 1000,
		flipSpeed = 1.5 * 1000,
		onAwayCallback = function () {},
		onAwayBackCallback = function () {},
		onVisibleCallback = function () {},
		onHiddenCallback = function () {},
		idle = null;

	function resetCard() {
		if (flipElem) {
			flipElem.toggleClass('flipped');
			flipElem = null;
		}
		if (flipTimer) {
			window.clearTimeout(flipTimer);
			flipTimer = null;
		}
	}

	function flipCard() {
		var pos = Math.floor(Math.random() * config.elements.length);
		flipElem = $('div', config.elements[pos]);
		flipElem.toggleClass('flipped');

		window.setTimeout(function () {
			if (flipElem) {
				resetCard();

				flipTimer = window.setTimeout(function () {
					flipCard();
				}, waitSpeed);
			}
		}, flipSpeed);
	}

	onAwayCallback = function () {
		if (!$('body').hasClass('build')) {
			flipCard();
		}
	};
	onAwayBackCallback = function () {
		resetCard();
	};

	idle = new Idle({
		onHidden: onHiddenCallback,
		onVisible: onVisibleCallback,
		onAway: onAwayCallback,
		onAwayBack: onAwayBackCallback,
		awayTimeout: startSpeed
	}).start();
}

//-----------------------------------------------------------------------

$(document).ready(function () {
	'use strict';

	installInternationalization();
	installNavigation();
	installCity(function () {
		installBackground();
		installMenu();
		installEvents();
		installTimer();
		installSlideshow();
		recalcBoard();

		window.navigation.showPage(window.navigation.page);
	});
});

//-----------------------------------------------------------------------
