$(document).ready(function() {
	var windowHeight = $(window).height();
	$('.hero-container .mask, .hero-container .hero').css('min-height', windowHeight + 'px');
	$('.body-container .image.left').css('min-height', windowHeight + 'px');
	// set section, mask to min-height of window height
	// grab height of .hero .copy.left and .hero .copy.right and add padding to vertically center
});

$(window).load(function() {
	var windowHeight = $(window).height();
	var vertCenterSelectors = [
		'.hero .copy.left',
		'.hero .copy.right',
		'#plan .copy.right',
		'#inspire .copy.right',
		'#source .copy.right',
		'#create .copy.right',
		'#distribute .copy.right',
		'#convert .copy.right',
		'#learn .copy.right',
	];

	var vertCenterLength = vertCenterSelectors.length;
	var vertCenterPad = 0;

	for (var i = 0; i < vertCenterLength; i++) {
		vertCenterPad = (windowHeight - $(vertCenterSelectors[i]).height()) / 2;
		$(vertCenterSelectors[i]).css({
			'padding-top': vertCenterPad + 'px',
			'padding-bottom': vertCenterPad + 'px'
		});
	}

	$('.hero .copy.left').fadeIn();
	$('.hero .copy.right').fadeIn();

});

/*

mimic OSX PDF preview scroll behavior:
	check scroll direction, see if top/bottom is in a certain area within a certain number of pixels, then scroll to that element

*/
