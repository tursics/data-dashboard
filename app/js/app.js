//-----------------------------------------------------------------------

function loadCard()
{
	function stringValueFormatter(startValue,changePerDay,unit,seconds)
	{
		return startValue+' '+unit;
	}

	function dateValueFormatter(startValue,changePerDay,unit,seconds)
	{
	}

	function euroValueFormatter(startValue,changePerDay,unit,seconds)
	{
		var value = seconds*changePerDay/24/60/60;
		if(value<1000) {
			value = parseInt(value*100);
			value = value.toString();
			while(value.length<3) {
				value = '0'+value;
			}
			value = value.substr(0,value.length-2)+','+value.substr(-2);
		} else {
//value*=1000;
			value = parseInt(value).toString();
			if(value.length>3) {
				value = value.substr(0,value.length-3)+'.'+value.substr(-3);
			}
			if(value.length>7) {
				value = parseInt(parseInt(value.substr(0,value.length-4))/100);
				value = value.toString();
				value = value.substr(0,value.length-1)+','+value.substr(-1)+'Mio ';
			}
		}
		return value+' '+unit;
	}

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
			var d1 = new Date();
			var d2 = new Date(data.front.value);
			var diff = (d2-d1)/1000/60/60/24;
			if(diff<1) {
				value = '- Tage';
			} else if(diff<2) {
				value = '1 Tag';
			} else {
				value = parseInt(diff)+' Tage';
			}
		} else if('euro'==data.front.format) {
			valueFormatter = euroValueFormatter;
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
			loadCard();
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

	if( card.data.change > 0) {
		var elem = $( 'section:nth-last-child(2) div figure.front span');
		config.updates.push({
			dom:elem,
			value:card.data.value,
			change:card.data.change,
			unit:card.data.unit,
			formatter: card.data.formatter,
		});
	}
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
			for(var i = 0; i< config.updates.length; ++i) {
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

function test()
{
	// http://daten.berlin.de/datensaetze/web-service-last-und-erzeugung-berlin
	// http://www.stromnetz-berlin.de/de/file/Erl_uterungen-Livedaten-Zugriff-Stromnetz-Berlin-SMeter_Engine_93664683.pdf

	var url = 'https://www.vattenfall.de/SmeterEngine/energyProjection';
	var xml = '<smeterengine start="2013-06-12T09:00:00" end="2013-06-12T11:00:00">'
			+ '    <cities> '
			+ '    <city>BERLIN</city> '
			+ '    <latitude>52.30</latitude> '
			+ '    <longitude>13.25</longitude> '
			+ '    </cities>           '
			+ '</smeterengine> ';
	$.ajax({
		url: url,
		data: xml,
		type: 'POST',
		contentType: 'text/xml',
		dataType: 'text',
		success : function(){
			console.log('xx');
		},
		error : function(xhr, ajaxOptions, thrownError){
			console.log(xhr);
			console.log(xhr.status);
			console.log(thrownError);
		}
	});
}

//-----------------------------------------------------------------------

$(document).ready(function() {
	installEvents();
	installTimer();
	recalcBoard();

	config.loaded = 0;
	config.updates = new Array();

	loadCard();

//	test();
});

//-----------------------------------------------------------------------
