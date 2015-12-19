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
	createNewCard('Text 1','Red','red');
	createNewCard('Text 2','Blue','blue');
	createNewCard('Text 3','Red','red');
	createNewCard('Text 4','Blue','blue');
	createNewCard('Text 5','Red','red');
	createNewCard('Text 6','Blue','blue');
	createNewCard('Text 7','Red','red');
	createNewCard('Text 8','Blue','blue');

	finishBoard();
});

//-----------------------------------------------------------------------
