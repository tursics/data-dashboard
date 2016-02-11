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
//	return startValue+' '+unit;

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
		data.front.textButton = data.front.textButton || '';
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
		var front = data.front.textTop+'<br><span>'+value+'</span><br>'+data.front.textButton;
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
			back:{text:back,image:backBGImage,style:backTextColor,css:backCSSClass},
			data:{value:data.front.value,unit:data.front.unit,change:changePerDay,formatter:valueFormatter},
		});
	}

	if(config.loaded < config.cards.length) {
		var url = config.cards[config.loaded];
		$.ajax(url)
		.done(function(json){
			var data = jQuery.parseJSON(json);
			createCard(data);
		})
		.fail(function(jqXHR, textStatus){
			if('parsererror'==textStatus) {
				var data = jQuery.parseJSON(jqXHR.responseText);
				if( typeof data.location != 'undefined') {
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
	card.data = card.data || {};
	card.data.value = card.data.value || '';
	card.data.unit = card.data.unit || '';
	card.data.change = card.data.change || 0;
	card.data.formatter = card.data.formatter || function() { return ''; };

	if(''!==card.front.image) {
		card.front.css = 'transparent '+card.front.css;
		card.front.text = '<img src="'+card.front.image+'" class="background"><div style="'+card.front.style+'">'+card.front.text+'</div>';
	} else {
		card.front.text = '<div style="'+card.front.style+'">'+card.front.text+'</div>';
	}
	if(''!==card.back.image) {
		card.back.css = 'transparent';
		card.back.text = '<img src="'+card.back.image+'" class="background">';
	} else {
		card.back.text = '<div style="'+card.back.style+'">'+card.back.text+'</div>';
	}

	var str = '<div class="cardwrapper"><figure class="front '+card.front.css+'">'+card.front.text+'</figure><figure class="back '+card.back.css+'">'+card.back.text+'</figure></div>';

	$( '<section>', {
		class: 'card',
		html: str
	})
	.insertBefore('section.endcard')
	.click(function() {
		$(this).children().first().toggleClass('flipped');
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

		if(typeof params['city'] !== 'undefined') {
			window.navigation.city = params['city'];
		}
		if(-1 == $.inArray(window.navigation.city, ['berlin'/*,'viena',...*/])) {
			window.navigation.city = 'berlin';
		}

		if(typeof params['page'] !== 'undefined') {
			window.navigation.page = params['page'];
		}
		if(-1 == $.inArray(window.navigation.page, ['cards','build'])) {
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
		page: '',
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

			if('build' == pageName) {
				$('body').addClass('build');
			} else {
				$('body').removeClass('build');
			}

			if('cards' == pageName) {
				window.navigation.replaceURI();

				resetCards();
				loadCards();
			} else if('build' == pageName) {
				window.navigation.replaceURI();

				resetCards();
				getUpdates(config.data.feed);
			} else {
				console.log('Page "'+pageName+'" does not exist');
			}
		}
	};

	loadNavigation();
	window.navigation.replaceURI();
}

//-----------------------------------------------------------------------

function installMenu()
{
	var brandTitle = 'Daten-Dashboard';
	document.title = brandTitle;

	var str = $('.navbar-header').html();
	str += '<span class="navbar-brand">'+brandTitle+'</span>';
	$('.navbar-header').html(str);

	str = '';
	str += '<ul class="nav navbar-nav">';
	str += '<li><a id="menuPageCards" href="#">Daten</a></li>';
//	str += '<li class="disabled"><a id="menuPageSpread" href="#spread">Verteilung</a></li>';
//	str += '<li class="disabled"><a id="menuPageHelp" href="#help">Hilfe</a></li>';
	str += '<li class="disabled"><a id="menuPageAbout" href="#">Über</a></li>';
//	str += '<li class="dropdown">';
//	str += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Berlin <span class="caret"></span></a>';
//	str += '<ul class="dropdown-menu">';
//	str += '<li class="dropdown-header">Verfügbare Städte</li>';
//	str += '<li><a href="#">Berlin</a></li>';
//	str += '</ul>';
//	str += '</li>';
	str += '</ul>';

	str += '<ul class="nav navbar-nav navbar-right">';
	str += '<li><a href="mailto:thomas@tursics.de">E-Mail</a></li>';
	str += '<li><a href="https://twitter.com/tursics/" target="_blank">Twitter</a></li>';
	str += '<li class="dropdown">';
	str += '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Mithelfen <span class="caret"></span></a>';
	str += '<ul class="dropdown-menu">';
	str += '<li><a href="https://github.com/tursics/data-dashboard/" target="_blank">Github</a></li>';
	str += '<li><a id="menuPageBuild" href="#">Bearbeiten</a></li>';
	str += '</ul>';
	str += '</li>';
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

function resetCards()
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
	config.feed = new Array();
}

//-----------------------------------------------------------------------

$(document).ready(function() {
	installNavigation();
	installMenu();
	installEvents();
	installTimer();
	recalcBoard();

	window.navigation.showPage(window.navigation.page);
});

//-----------------------------------------------------------------------
