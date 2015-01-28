var pages = [
	{
		id: '#plan',
		top: 0,
	},
	{
		id: '#inspire',
		top: 0,
	},
	{
		id: '#source',
		top: 0,
	},
	{
		id: '#create',
		top: 0,
	},
	{
		id: '#distribute',
		top: 0,
	},
	{
		id: '#convert',
		top: 0,
	},
	{
		id: '#learn',
		top: 0,
	},
];

var pagesLength = pages.length;

var lastScroll = $(window).scrollTop();
var scrollDirection = 'down';

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

	for (var i = 0; i < pagesLength; i++) {
		pages[i].top = $(pages[i].id).position().top;
	}

});

// this should only fire when scrolling stops
// $(window).scroll(function() {
// 	var currentPage = {};
// 	for (var i = 0; i < pagesLength; i++) {
// 		if (window.scrollY < pages[i].top) {
// 			window.scrollTo(0, currentPage.top);
// 			console.log('1');
// 			return;
// 		}
// 		else {
// 			if (window.scrollY >= pages[i].top) {
// 				console.log('current page set');
// 				currentPage = pages[i];
// 			}
// 			else {
// 				window.scrollTo(0, currentPage.top);
// 				console.log(pages[i].top);
// 				return;
// 			}
// 		}
// 	}
// });

$(function() {
	var timer;
	$(window).scroll(function() {
		scrollCheck = $(this).scrollTop();
		if (Math.abs(scrollCheck - lastScroll) > 20) {
			scrollDirection = false;
		}
		else if (scrollCheck > lastScroll) {
			scrollDirection = 'down';
		}
		else {
			scrollDirection = 'up';
		}
    	clearTimeout(timer);
    	timer = setTimeout(function() {
      		$(window).trigger("scrollStop");
    	}, 250);
    	lastScroll = scrollCheck;
  	});
});

$(window).bind("scrollStop", function() {
	var currentPage = {};
	if (scrollDirection === false) {
		// drop user on page they were previously on
	}
	for (var i = 0; i < pagesLength; i++) {
		if (window.scrollY < pages[i].top) {
			window.scrollTo(0, currentPage.top);
			return;
		}
		else {
			if (window.scrollY >= pages[i].top) {
				currentPage = pages[i];
			}
			else {
				window.scrollTo(0, currentPage.top);
				return;
			}
		}
	}
});

/*

mimic OSX PDF preview scroll behavior:
	check scroll direction, see if top/bottom is in a certain area within a certain number of pixels, then scroll to that element

*/
