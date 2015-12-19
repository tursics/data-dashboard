//-----------------------------------------------------------------------

function createNewCard(front,back,color)
{
	var str = '<div class="cardwrapper"><figure class="front">'+front+'</figure><figure class="back">'+back+'</figure></div>';

	$( '<section>', {
		class: 'card '+color,
		html: str
	})
	.appendTo( $('#board') )
	.click( function() {
		$(this).children().first().toggleClass('flipped');
	});
}

//-----------------------------------------------------------------------

$( document ).ready( function() {
	createNewCard('Text 1','Red','red');
	createNewCard('Text 2','Blue','blue');
	createNewCard('Text 3','Red','red');
	createNewCard('Text 4','Blue','blue');
});

//-----------------------------------------------------------------------
