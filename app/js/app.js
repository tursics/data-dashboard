//-----------------------------------------------------------------------

function createNewCard(front,back,color)
{
	var str = '<div class="cardwrapper"><figure class="front">'+front+'</figure><figure class="back">'+back+'</figure></div>';

	$( '<section>', {
		class: 'card '+color,
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
	createNewCard('<img src="./img/codefor_berlin.png" style="width:100%;margin-top:-3.6em;">','Berlin','transparent');
	createNewCard('<img src="./img/codefor_bonn.png" style="width:100%;margin-top:-3.6em;">','Bonn','transparent');
	createNewCard('<img src="./img/codefor_chemnitz.png" style="width:100%;margin-top:-3.6em;">','Chemnitz','transparent');
	createNewCard('<img src="./img/codefor_dresden.png" style="width:100%;margin-top:-3.6em;">','Dresden','transparent');
	createNewCard('<img src="./img/codefor_frankfurt.png" style="width:100%;margin-top:-3.6em;">','Frankfurt','transparent');
	createNewCard('<img src="./img/codefor_giessen.png" style="width:100%;margin-top:-3.6em;">','Gießen','transparent');
	createNewCard('<img src="./img/codefor_hamburg.png" style="width:100%;margin-top:-3.6em;">','Hamburg','transparent');
	createNewCard('<img src="./img/codefor_heilbronn.png" style="width:100%;margin-top:-3.6em;">','Heilbronn','transparent');
	createNewCard('<img src="./img/codefor_jena.png" style="width:100%;margin-top:-3.6em;">','Jena','transparent');
	createNewCard('<img src="./img/codefor_karlsruhe.png" style="width:100%;margin-top:-3.6em;">','Karlsruhe','transparent');
	createNewCard('<img src="./img/codefor_koeln.png" style="width:100%;margin-top:-3.6em;">','Köln','transparent');
	createNewCard('<img src="./img/codefor_leipzig.png" style="width:100%;margin-top:-3.6em;">','Leipzig','transparent');
	createNewCard('<img src="./img/codefor_magdeburg.png" style="width:100%;margin-top:-3.6em;">','Magdeburg','transparent');
	createNewCard('<img src="./img/codefor_muenchen.png" style="width:100%;margin-top:-3.6em;">','München','transparent');
	createNewCard('<img src="./img/codefor_muenster.png" style="width:100%;margin-top:-3.6em;">','Münster','transparent');
	createNewCard('<img src="./img/codefor_stuttgart.png" style="width:100%;margin-top:-3.6em;">','Stuttgart','transparent');
	createNewCard('<img src="./img/codefor_ulm.png" style="width:100%;margin-top:-3.6em;">','Ulm','transparent');
	createNewCard('<img src="./img/codefor_wuppertal.png" style="width:100%;margin-top:-3.6em;">','Wuppertal','transparent');
	createNewCard('Text a','Red','red');
	createNewCard('Text b','Blue','blue');

	finishBoard();
});

//-----------------------------------------------------------------------
