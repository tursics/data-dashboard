//-----------------------------------------------------------------------

function createNewCard(front,back,color)
{
	var str = '<div id="card"><figure class="front">'+front+'</figure><figure class="back">'+back+'</figure></div>';

	$( '<section>', {
		class: 'container '/*+color*/,
		html: str
	})
	.appendTo( $('#board') )
	.click( function() {
		$(this).children().first().toggleClass('flipped');
	});
}

//-----------------------------------------------------------------------

$( document ).ready( function() {
	$( '<div>', {
		class: 'hexagon red',
		text: 'Test 1'
	}).appendTo( $('#board') );

	$( '<div>', {
		class: 'hexagon blue',
		text: 'Test 2'
	}).appendTo( $('#board') );

	$( '<div>', {
		class: 'hexagon red',
		text: 'Test 3'
	}).appendTo( $('#board') );

	$( '<div>', {
		class: 'hexagon blue',
		text: 'Test 4'
	}).appendTo( $('#board') );

	createNewCard('Front text','Back text','red');
});

//-----------------------------------------------------------------------
