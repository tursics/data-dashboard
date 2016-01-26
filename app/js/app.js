//-----------------------------------------------------------------------

function loadCard(url)
{
	function createCard(data)
	{
		data = data || {};
		data.front = data.front || {};
		data.front.textTop = data.front.textTop || '';
		data.front.value = data.front.value || '';
		data.front.unit = data.front.unit || '';
		data.front.textButton = data.front.textButton || '';
		data.front.color = data.front.color || '';
		data.front.background = data.front.background || '';
		data.front.cssClass = data.front.cssClass || '';
		data.back = data.back || {};
		data.back.text = data.back.text || '';
		data.back.color = data.back.color || '';
		data.back.background = data.back.background || '';
		data.back.cssClass = data.back.cssClass || '';

		var front = data.front.textTop+'<br><span>'+data.front.value+' '+data.front.unit+'</span><br>'+data.front.textButton;
		var frontTextColor = 'color:'+data.front.color+';';
		var frontBGImage = data.front.background;
		var frontCSSClass = data.front.cssClass;
		var back = data.back.text;
		var backTextColor = 'color:'+data.back.color+';';
		var backBGImage = data.back.background;
		var backCSSClass = data.back.cssClass;

		createNewCard({
			front:{text:front,image:frontBGImage,style:frontTextColor,css:frontCSSClass+' display'},
			back:{text:back,image:backBGImage,style:backTextColor,css:backCSSClass},
		});
	}

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
		// process next card
	});
}

//-----------------------------------------------------------------------

function createNewCard(config)
{
	config = config || {};
	config.front = config.front || {};
	config.front.css = config.front.css || '';
	config.front.image = config.front.image || '';
	config.front.style = config.front.style || '';
	config.front.text = config.front.text || '';
	config.back = config.back || {};
	config.back.css = config.back.css || '';
	config.back.image = config.back.image || '';
	config.back.style = config.back.style || '';
	config.back.text = config.back.text || '';

	if(''!==config.front.image) {
		config.front.css = 'transparent '+config.front.css;
		config.front.text = '<img src="'+config.front.image+'" class="background"><div style="'+config.front.style+'">'+config.front.text+'</div>';
	} else {
		config.front.text = '<div style="'+config.front.style+'">'+config.front.text+'</div>';
	}
	if(''!==config.back.image) {
		config.back.css = 'transparent';
		config.back.text = '<img src="'+config.back.image+'" class="background">';
	} else {
		config.back.text = '<div style="'+config.back.style+'">'+config.back.text+'</div>';
	}

	var str = '<div class="cardwrapper"><figure class="front '+config.front.css+'">'+config.front.text+'</figure><figure class="back '+config.back.css+'">'+config.back.text+'</figure></div>';

	$( '<section>', {
		class: 'card',
		html: str
	})
	.insertBefore('section.endcard')
	.click(function() {
		$(this).children().first().toggleClass('flipped');
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

	createNewCard({
		front:{image:'./img/berlinopendata.svg'},
		back:{text:'In Berlin gibt es das<br><a href="http://daten.berlin.de" target="_blank">Datenportal</a><br>und den<br><a href="http://fbinter.stadt-berlin.de/fb/" target="_blank">FIS-Broker</a>.',css:''}
	});
	createNewCard({
		front:{image:'./img/codeforberlin.svg'},
		back:{text:'<a href="http://codefor.berlin" target="_blank">Code for Berlin</a>',css:'card1line'}
	});
	createNewCard({
		front:{text:'Du brauchst Hilfe?<br>Klick hier',css:'card2lines'},
		back:{text:'Dann klick noch mal',css:'card1line'},
	});

	loadCard('berlin/angebote-zur-unterstuetzung-von-fluechtlingen.json');

	recalcBoard();

//	test();
});

//-----------------------------------------------------------------------
