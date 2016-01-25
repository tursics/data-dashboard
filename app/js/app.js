//-----------------------------------------------------------------------

function createNewCard(config)
{
	config = config || {};
	config.front = config.front || {};
	config.front.css = config.front.css || '';
	config.front.image = config.front.image || '';
	config.front.text = config.front.text || '';
	config.back = config.back || {};
	config.back.css = config.back.css || '';
	config.back.image = config.back.image || '';
	config.back.text = config.back.text || '';

	if(''!==config.front.image) {
		config.front.css = 'transparent';
		config.front.text = '<img src="'+config.front.image+'" style="width:100%;margin-top:-3.6em;">';
	} else {
		config.front.text = '<div>'+config.front.text+'</div>';
	}
	if(''!==config.back.image) {
		config.back.css = 'transparent';
		config.back.text = '<img src="'+config.back.image+'" style="width:100%;margin-top:-3.6em;">';
	} else {
		config.front.text = '<div>'+config.front.text+'</div>';
	}

	var str = '<div class="cardwrapper"><figure class="front '+config.front.css+'">'+config.front.text+'</figure><figure class="back '+config.back.css+'">'+config.back.text+'</figure></div>';

	$( '<section>', {
		class: 'card',
		html: str
	})
	.appendTo($('#board'))
	.click(function() {
		$(this).children().first().toggleClass('flipped');
	});
}

//-----------------------------------------------------------------------

function finishBoard()
{
	$( '<section>', {
		class: 'endcard'
	})
	.appendTo($('#board'));

	var resizeTimer;
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(recalcPositions, 100);
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
	createNewCard({
		front:{image:'./img/berlinopendata.svg'},
		back:{text:'In Berlin gibt es das<br><a href="http://daten.berlin.de" target="_blank">Datenportal</a><br>und den<br><a href="http://fbinter.stadt-berlin.de/fb/" target="_blank">FIS-Broker</a>.',css:'card4lines'}
	});
	createNewCard({
		front:{image:'./img/codeforberlin.svg'},
		back:{text:'<a href="http://codefor.berlin" target="_blank">Code for Berlin</a>',css:'card1line'}
	});
	createNewCard({
		front:{text:'Du brauchst Hilfe?<br>Klick hier',css:'card2lines'},
		back:{text:'Dann klick noch mal',css:'card1line'},
	});
	createNewCard({
		front:{image:'./img/grassland.svg'},
		back:{text:'Test',css:'card1line'}
	});
	createNewCard({
		front:{image:'./img/sunset.svg'},
		back:{text:'Test',css:'card1line'}
	});
	createNewCard({
		front:{image:'./img/template.svg'},
		back:{text:'Test',css:'card1line'}
	});
	createNewCard({
		front:{image:'./img/template2.svg'},
		back:{text:'Test',css:'card1line'}
	});
	createNewCard({
		front:{image:'./img/template3.svg'},
		back:{text:'Test',css:'card1line'}
	});

	createNewCard({
		front:{text:'Arial Font<br>0815 km<br>This is a ÄÖÜäöüß font usage.',css:'card3lines'},
		back:{text:'void',css:'card1line'},
	});
	createNewCard({
		front:{text:'Miso Bold Font<br>0815 km<br>This is a ÄÖÜäöüß font usage.',css:'card3lines fontMisoBold'},
		back:{text:'void',css:'card1line'},
	});
	createNewCard({
		front:{text:'Miso Regular Font<br>0815 km<br>This is a ÄÖÜäöüß font usage.',css:'card3lines fontMisoRegular'},
		back:{text:'void',css:'card1line'},
	});
	createNewCard({
		front:{text:'Miso Light Font<br>0815 km<br>This is a ÄÖÜäöüß font usage.',css:'card3lines fontMisoLight'},
		back:{text:'void',css:'card1line'},
	});
	createNewCard({
		front:{text:'Judson Bold Font<br>0815 km<br>This is a ÄÖÜäöüß font usage.',css:'card3lines fontJudsonBold'},
		back:{text:'void',css:'card1line'},
	});
	createNewCard({
		front:{text:'Judson Medium Font<br>0815 km<br>This is a ÄÖÜäöüß font usage.',css:'card3lines fontJudsonMedium'},
		back:{text:'void',css:'card1line'},
	});
	createNewCard({
		front:{text:'Judson Italic Font<br>0815 km<br>This is a ÄÖÜäöüß font usage.',css:'card3lines fontJudsonItalic'},
		back:{text:'void',css:'card1line'},
	});
	createNewCard({
		front:{text:'Francois One Font<br>0815 km<br>This is a ÄÖÜäöüß font usage.',css:'card3lines fontFrancoisOne'},
		back:{text:'void',css:'card1line'},
	});

	finishBoard();

	test();
});

//-----------------------------------------------------------------------
