//-----------------------------------------------------------------------

function stringValueFormatter(startValue,changePerDay,unit,seconds)
{
	return startValue+' '+unit;
}

//-----------------------------------------------------------------------

function dateValueFormatter(startValue,changePerDay,unit,seconds)
{
	var usedUnit = 'Tage';
	if('Tagen' == unit) {
		usedUnit = unit;
	} else if('Tage' == unit) {
		usedUnit = unit;
	}

	var d1 = new Date();
	var d2 = new Date(startValue);
	var diff = (d2-d1)/1000/60/60/24;

	if(diff<1) {
		value = '- ' + usedUnit;
	} else if(diff<2) {
		value = '1 Tag';
	} else {
		value = parseInt(diff)+' ' + usedUnit;
	}

	return value;
}

//-----------------------------------------------------------------------

function intValueFormatter(startValue,changePerDay,unit,seconds)
{
	var value = startValue;
	if(''==value) {
		value = 0;
	}
	if(0<parseInt(changePerDay)) {
		value = seconds*changePerDay/24/60/60;
	}
	value = parseInt(value);

	if(value>1000) {
		value = value.toString();
		value = value.substr(0,value.length-3)+'.'+value.substr(-3);
	}
	return value+' '+unit;
}

//-----------------------------------------------------------------------

function euroValueFormatter(startValue,changePerDay,unit,seconds)
{
	var value = startValue;
	if(0<changePerDay) {
		value = seconds*changePerDay/24/60/60;
	}

	if(value<1000) {
		value = parseInt(value*100);
		value = value.toString();
		while(value.length<3) {
			value = '0'+value;
		}
		value = value.substr(0,value.length-2)+','+value.substr(-2);
	} else {
		value = parseInt(value).toString();
		if(value.length>3) {
			value = value.substr(0,value.length-3)+'.'+value.substr(-3);
		}
		if(value.length>11) {
			value = parseInt(parseInt(value.substr(0,value.length-4))/1000000);
			value = value.toString();
			value = value+' Mrd ';
		} else if(value.length>10) {
			value = parseInt(parseInt(value.substr(0,value.length-4))/100000);
			value = value.toString();
			value = value.substr(0,value.length-1)+','+value.substr(-1)+' Mrd ';
		} else if(value.length>8) {
			value = parseInt(parseInt(value.substr(0,value.length-4))/1000);
			value = value.toString();
			value = value+' Mio ';
		} else if(value.length>7) {
			value = parseInt(parseInt(value.substr(0,value.length-4))/100);
			value = value.toString();
			value = value.substr(0,value.length-1)+','+value.substr(-1)+' Mio ';
		}
	}
	return value+' '+unit;
}

//-----------------------------------------------------------------------

function loadCards()
{
	function createCard(data)
	{
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

		var value = data.front.value+' '+data.front.unit;
		var valueFormatter = stringValueFormatter;
		if('date'==data.front.format) {
			valueFormatter = dateValueFormatter;
			value = valueFormatter(data.front.value,0,data.front.unit,0);
		} else if('euro'==data.front.format) {
			valueFormatter = euroValueFormatter;
			value = valueFormatter(data.front.value,0,data.front.unit,0);
		} else if('int'==data.front.format) {
			valueFormatter = intValueFormatter;
			value = valueFormatter(data.front.value,0,data.front.unit,0);
		}
		var front = data.front.textTop+'<br><span>'+value+'</span><br>'+data.front.textBottom;
		var frontTextColor = 'color:'+data.front.color+';';
		var frontBGImage = data.front.background;
		var frontCSSClass = data.front.cssClass;
		var back = data.back.text;
		var backTextColor = 'color:'+data.back.color+';';
		var backBGImage = data.back.background;
		var backCSSClass = data.back.cssClass;
		var changePerDay = data.front.changePerDay;

		createNewCard({
			front:{text:front,image:frontBGImage,style:frontTextColor,css:frontCSSClass+' display'},
			back:{text:back,image:backBGImage,style:backTextColor,css:backCSSClass,url:data.portal.url},
			data:{value:data.front.value,unit:data.front.unit,change:changePerDay,formatter:valueFormatter},
		});
	}

	if((typeof cityConfig.cards != 'undefined') && (config.loaded < cityConfig.cards.length)) {
		var url = cityConfig.cards[config.loaded];
		$.ajax(url)
		.done(function(json){
			var data = jQuery.parseJSON(json);
			createCard(data);
		})
		.fail(function(jqXHR, textStatus){
			if('parsererror'==textStatus) {
				var data = jQuery.parseJSON(jqXHR.responseText);
				if(typeof data.location != 'undefined') {
					createCard(data);
					return;
				}
			}
			createNewCard({
				front:{text:textStatus,css:'card1line'},
				back:{text:'Error in reading '+url,css:''},
			});
		})
		.always(function(){
			// make the back of the card invisible
			// show back
			recalcBoard(); // re-calc all positions
			// load all pending images
			// flip card to front
			// make the back of the card visible

			++config.loaded;
			loadCards();
		});
	}
}

//-----------------------------------------------------------------------

function createNewCard(card)
{
	card = card || {};
	card.front = card.front || {};
	card.front.css = card.front.css || '';
	card.front.image = card.front.image || '';
	card.front.style = card.front.style || '';
	card.front.text = card.front.text || '';
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
	card.data.formatter = card.data.formatter || function() { return ''; };

//	<i class="dashboardicon animate-spin">&#xe801;</i>

	var button = '<div class="buttonbar">';
	button += '<button type="button" class="btn btn-primary btn-flipp"><i class="dashboardicon">&#xe805;</i></button>';
	if('' != card.back.url) {
		button += '<button type="button" class="btn btn-primary btn-data" data-url="' + card.back.url + '"><i class="dashboardicon">&#xe809;</i></button>';
	}
	button += '</div>'

	if(''!==card.front.image) {
		card.front.css = 'transparent '+card.front.css;
		card.front.text = '<img src="'+card.front.image+'" class="background"><div style="pointer-events: none;'+card.front.style+'">'+card.front.text+'</div>';
	} else {
		card.front.text = '<div style="'+card.front.style+'">'+card.front.text+'</div>';
	}
	if(''!==card.back.image) {
		card.back.css = 'transparent';
		card.back.text = '<img src="'+card.back.image+'" class="background">';
	} else {
		card.back.text = '<div style="'+card.back.style+'">'+card.back.text+'</div>'+button;
	}

	var str = '<div class="cardwrapper"><figure class="front '+card.front.css+'">'+card.front.text+'</figure><figure class="back '+card.back.css+'">'+card.back.text+'</figure></div>';

	var cardwrapper = $( '<section>', {
		class: 'card',
		html: str
	})
	.insertBefore('section.endcard')
	.children().first();

	$('.front',cardwrapper).click(function() {
		$(this).parent().toggleClass('flipped');
	});
	$('.back .btn-flipp',cardwrapper).click(function() {
		$(this).parent().parent().parent().toggleClass('flipped');
	});
	$('.back .btn-data',cardwrapper).click(function() {
		var url = $(this).data('url');

		var link = document.createElement('a');
		link.href = url;
		link.target = '_blank';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		delete link;
	});

	config.elements.push($( 'section:nth-last-child(2)'));
	if( card.data.change > 0) {
		config.updates.push({
			dom:$( 'section:nth-last-child(2) div figure.front span'),
			value:card.data.value,
			change:card.data.change,
			unit:card.data.unit,
			formatter: card.data.formatter,
		});
	}
}

//-----------------------------------------------------------------------

function installNavigation()
{
	var initPage = false;

	function loadNavigation()
	{
		var queries = location.search.replace(/^\?/, '').split('&');
		var params = {};
		for(var i = 0; i < queries.length; ++i) {
			split = queries[i].split('=');
			params[split[0]] = split[1];
		}

		window.navigation.cityId = 0;
		window.navigation.city = config.cities[0].path;
		if(typeof params['city'] !== 'undefined') {
			for(var i = 0; i < config.cities.length; ++i) {
				if(params['city'] == config.cities[i].path) {
					window.navigation.cityId = i;
					window.navigation.city = params['city'];
					break;
				}
			}
		}

		if(typeof params['page'] !== 'undefined') {
			window.navigation.page = params['page'];
		}
		if(-1 == $.inArray(window.navigation.page, ['cards','about','build'])) {
			window.navigation.page = 'cards';
		}
	}

	function saveNavigation(pushHistory)
	{
		var url = '?city=' + window.navigation.city;
		url += '&page=' + window.navigation.page;

		try {
			if(pushHistory) {
				window.history.pushState( {}, '', url);
			} else {
				window.history.replaceState( {}, '', url);
			}
		} catch(e) {
			console.log(e);
		}
	}

	window.navigation = window.navigation || {
		city: '',
		cityId: 0,
		page: '',
		useFileSystem: false,
		replaceURI: function() {
			saveNavigation(false);
		},
		showPage: function(pageName) {
			if(!initPage) {
				initPage = true;
			} else if(pageName == this.page){
				return;
			}

			this.page = pageName;

			if('cards' == pageName) {
				$('#menuPageCards').parent().addClass('active');
			} else {
				$('#menuPageCards').parent().removeClass('active');
			}

			if('about' == pageName) {
				$('#menuPageAbout').parent().addClass('active');
			} else {
				$('#menuPageAbout').parent().removeClass('active');
			}

			if('build' == pageName) {
				$('body').addClass('build');
			} else {
				$('body').removeClass('build');
			}

			if('cards' == pageName) {
				window.navigation.replaceURI();

				resetCards(true);
				loadCards();
			} else if('about' == pageName) {
				window.navigation.replaceURI();

				resetCards(true);
				about();
			} else if('build' == pageName) {
				window.navigation.replaceURI();

				resetCards(true);
				getUpdates(cityConfig.data.feed, cityConfig.data.ckan);
			} else {
				console.log('Page "'+pageName+'" does not exist');
			}
		}
	};

	loadNavigation();
	window.navigation.useFileSystem = (0 == location.href.indexOf('file://'));
	window.navigation.replaceURI();
}

//-----------------------------------------------------------------------

function installCity(callbackFunc)
{
	cityConfig = {};

	var url = window.navigation.city;
//	if(window.navigation.useFileSystem) {
//		url = location.href.substr(0, location.href.lastIndexOf('/')) + '/' + url;
//	}

	url += '/cityConfig.json';
	$.ajax(url)
		.done(function(json){
			var data = jQuery.parseJSON(json);
			cityConfig = data;
	})
	.fail(function(jqXHR, textStatus){
		if('parsererror'==textStatus) {
			var data = jQuery.parseJSON(jqXHR.responseText);
			if(typeof data.meta != 'undefined') {
				cityConfig = data;
				return;
			}
		}
		console.log('Could not load "' + url + '"');
	})
	.always(function(){
		callbackFunc();
	});
}

//-----------------------------------------------------------------------

function installBackground()
{
	if((typeof cityConfig.meta != 'undefined') && (typeof cityConfig.meta.background != 'undefined')) {
		$('body').css('background-image', 'url(' + cityConfig.meta.background + ')');
	}
}

//-----------------------------------------------------------------------

function installMenu()
{
	var brandTitle = 'Daten-Waben';
	document.title = brandTitle;

	var str = $('.navbar-header').html();
	str += '<span class="navbar-brand">'+brandTitle+'</span>';
	$('.navbar-header').html(str);

	str = '';
	str += '<ul class="nav navbar-nav">';

	var strMail = '';
	var strTwitter = '';
	var strGithub = '';
	if(typeof cityConfig.meta == 'undefined') {
		strMail = 'thomas@tursics.de';
		strTwitter = 'https://twitter.com/tursics/';
		strGithub = 'https://github.com/tursics/data-dashboard/';

		$('.container .alert')
		.html('Das hätte nicht passieren dürfen. Irgendwas funktioniert hier nicht. Bitte kontaktiere mich.')
		.addClass('alert-danger')
		.css('display','');
	} else {
		str += '<li><a id="menuPageCards" href="#">Daten</a></li>';
//		str += '<li class="disabled"><a id="menuPageSpread" href="#spread">Verteilung</a></li>';
//		str += '<li class="disabled"><a id="menuPageHelp" href="#help">Hilfe</a></li>';
		str += '<li><a id="menuPageAbout" href="#">Info</a></li>';

		if(cityConfig.meta.showMenuCity && (config.cities.length > 1)) {
			var citylist = '';
			var portallist = '';
			for(var i = 0; i < config.cities.length; ++i) {
				var citydata = config.cities[i];
				var badge = '';
				if('' != citydata.badge) {
					badge = ' <span class="label label-success">' + citydata.badge + '</span>';
				}
				if('city' == citydata.group) {
					citylist += '<li><a href="./index.html?city=' + citydata.path + '">' + citydata.name + badge + '</a></li>';
				} else if('portal' == citydata.group) {
					portallist += '<li><a href="./index.html?city=' + citydata.path + '">' + citydata.name + badge + '</a></li>';
				}
			}

			str += '<li class="dropdown">';
			str += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + config.cities[window.navigation.cityId].name + ' <span class="caret"></span></a>';
			str += '<ul class="dropdown-menu">';
			if(citylist.length > 0) {
				str += '<li class="dropdown-header">Verfügbare Städte</li>';
				str += citylist;
			}
			if(portallist.length > 0) {
				str += '<li role="separator" class="divider"></li>';
				str += '<li class="dropdown-header">Andere Portale</li>';
				str += portallist;
			}
			str += '</ul>';
			str += '</li>';

			strMail = cityConfig.meta.mail;
			strTwitter = cityConfig.meta.twitter;
			strGithub = cityConfig.meta.github;
		}

		var badge = config.cities[window.navigation.cityId].badge;
		if('Alpha' == badge) {
			$('.container .alert')
			.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Die Daten-Waben befinden sich noch in einer sehr frühen Entwicklungsphase. Es ist noch nicht für die große Öffentlichkeit gedacht. Du kannst mir aber gerne eine E-Mail schicken, damit ich dich auf dem Laufenden halten kann.')
			.addClass('alert-warning')
			.css('display','');
		} else if('Beta' == badge) {
			$('.container .alert')
			.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Die Testphase für die Daten-Waben haben begonnen. Du kannst mir gerne eine E-Mail mit Fehlern oder Verbesserungswünschen schicken.')
			.addClass('alert-info')
			.css('display','');
		} else {
			$('.container .alert')
			.html('Welche Daten stecken in deinem Datenportal? Die Daten-Waben zeigen für jeden Datensatz ein Sechseck mit einer kurzen Info an.')
			.addClass('alert-warning')
			.css('display','');
		}
	}

	str += '</ul>';

	str += '<ul class="nav navbar-nav navbar-right">';
	str += '<li><a href="mailto:' + strMail + '">E-Mail</a></li>';
	str += '<li><a href="' + strTwitter + '" target="_blank">Twitter</a></li>';
	if(typeof cityConfig.meta != 'undefined') {
		str += '<li class="dropdown">';
		str += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Mithelfen <span class="caret"></span></a>';
		str += '<ul class="dropdown-menu">';
		str += '<li><a href="' + strGithub + '" target="_blank">Github</a></li>';
		str += '<li><a id="menuPageBuild" href="#">Bearbeiten</a></li>';
		str += '</ul>';
		str += '</li>';
	}
	str += '</ul>';

	$('#navbar').html(str);

	$('#menuPageCards').click(function() {
		window.navigation.showPage('cards');
//		return false;
	});
	$('#menuPageAbout').click(function() {
		window.navigation.showPage('about');
//		return false;
	});
	$('#menuPageBuild').click(function() {
		window.navigation.showPage('build');
//		return false;
	});
}

//-----------------------------------------------------------------------

function installEvents()
{
	var resizeTimer;
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(recalcPositions, 50);
	});

	function recalcPositions() {
		var elements = $('#board').children();
		var lastTop;
		var y = 0;
		for(var i = 0; i < (elements.length-1); ++i) {
			var e = $(elements[i]);
			var top = parseInt(e.position().top);
			if((0===i) || (lastTop === top)) {
				e.css('margin-left','0');
			} else {
				++y;
				e.css('margin-left',y%2?'6.55em':'0');
			}
			lastTop = top;
		};
	};
}

//-----------------------------------------------------------------------

function installTimer()
{
	var startTime = (new Date()).getTime();
	var delay = 100;

	function timerFunc() {
		try {
			var diffTime = parseInt(((new Date()).getTime() - startTime) / 1000);
			for(var i = 0; i < config.updates.length; ++i) {
				var update = config.updates[i];
				update.dom.text( update.formatter(update.value,update.change,update.unit,diffTime));
			}
		} catch(e) {
//			console.log(e);
		}

		setTimeout(timerFunc, delay);
	}

	setTimeout(timerFunc, delay);
}

//-----------------------------------------------------------------------

function recalcBoard()
{
	$(window).trigger('resize');
}

//-----------------------------------------------------------------------

function resetCards(clearFeed)
{
	$('#build').html('');

	config.elements = config.elements || new Array();

	for(var i = 0; i < config.elements.length; ++i) {
		var element = config.elements[i];
		element.remove();
	}

	config.loaded = 0;
	config.elements = new Array();
	config.updates = new Array();

	if(clearFeed) {
		config.feed = new Array();
	}
}

//-----------------------------------------------------------------------

$(document).ready(function() {
	installNavigation();
	installCity(function() {
		installBackground();
		installMenu();
		installEvents();
		installTimer();
		recalcBoard();

		window.navigation.showPage(window.navigation.page);
	});
});

//-----------------------------------------------------------------------
