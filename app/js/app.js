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
	}
	if(''!==config.back.image) {
		config.back.css = 'transparent';
		config.back.text = '<img src="'+config.back.image+'" style="width:100%;margin-top:-3.6em;">';
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

	finishBoard();
});

//-----------------------------------------------------------------------
