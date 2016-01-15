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
		front:{image:'./img/codefor_berlin.png'},
		back:{text:'Berlin'}
	});
	createNewCard({
		front:{image:'./img/codefor_chemnitz.png'},
		back:{text:'Chemnitz'}
	});
	createNewCard({
		front:{image:'./img/codefor_koeln.png'},
		back:{text:'Köln'}
	});
	createNewCard({
		front:{image:'./img/codefor_heilbronn.png'},
		back:{text:'Heilbronn'}
	});

	createNewCard({
		front:{image:'./img/codefor_leipzig.png'},
		back:{text:'Leipzig'}
	});
	createNewCard({
		front:{image:'./img/codefor_ulm.png'},
		back:{text:'Ulm'}
	});
	createNewCard({
		front:{image:'./img/codefor_magdeburg.png'},
		back:{text:'Magdeburg'}
	});
	createNewCard({
		front:{image:'./img/codefor_frankfurt.png'},
		back:{text:'Frankfurt'}
	});

	createNewCard({
		front:{image:'./img/codefor_jena.png'},
		back:{text:'Jena'}
	});
	createNewCard({
		front:{image:'./img/codefor_wuppertal.png'},
		back:{text:'Wuppertal'}
	});
	createNewCard({
		front:{image:'./img/codefor_giessen.png'},
		back:{text:'Gießen'}
	});
	createNewCard({
		front:{image:'./img/codefor_muenster.png'},
		back:{text:'Münster'}
	});

	createNewCard({
		front:{image:'./img/codefor_bonn.png'},
		back:{text:'Bonn'}
	});
	createNewCard({
		front:{image:'./img/codefor_muenchen.png'},
		back:{text:'München'}
	});
	createNewCard({
		front:{image:'./img/codefor_hamburg.png'},
		back:{text:'Hamburg'}
	});
	createNewCard({
		front:{text:'Code for Freiburg',css:'blue'},
		back:{text:'Freiburg'}
	});
	createNewCard({
		front:{text:'Code for Düsseldorf',css:'blue'},
		back:{text:'Düsseldorf'},
	});
	createNewCard({
		front:{text:'Code for Erlangen',css:'blue'},
		back:{text:'Erlangen'},
	});

	createNewCard({
		front:{image:'./img/codefor_karlsruhe.png'},
		back:{text:'Karlsruhe'}
	});
	createNewCard({
		front:{image:'./img/codefor_dresden.png'},
		back:{text:'Dresden'}
	});
	createNewCard({
		front:{image:'./img/codefor_stuttgart.png'},
		back:{text:'Stuttgart'}
	});
	createNewCard({
		front:{text:'OpenRuhr',css:'black'},
		back:{text:'OpenRuhr'},
	});
	createNewCard({
		front:{text:'Code for Kassel',css:'black'},
		back:{text:'Kassel'},
	});
	createNewCard({
		front:{text:'Code for Niederrhein',css:'black'},
		back:{text:'Niederrhein'},
	});

	finishBoard();
});

//-----------------------------------------------------------------------
