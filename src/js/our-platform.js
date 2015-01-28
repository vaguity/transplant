var pages = [
	{
		id: '#plan',
		top: null,
	},
	{
		id: '#inspire',
		top: null,
	},
	{
		id: '#source',
		top: null,
	},
	{
		id: '#create',
		top: null,
	},
	{
		id: '#distribute',
		top: null,
	},
	{
		id: '#convert',
		top: null,
	},
	{
		id: '#learn',
		top: null,
	},
];

var pagesLength = pages.length;

$(document).ready(function() {
	var windowHeight = $(window).height();
	$('.hero-container .mask, .hero-container .hero').css('min-height', windowHeight + 'px');
	$('.body-container .image.left').css('min-height', windowHeight + 'px');
	$('.content.our-platform').css('height', windowHeight + 'px');
	// set section, mask to min-height of window height
	// grab height of .hero .copy.left and .hero .copy.right and add padding to vertically center
});

$(window).load(function() {
	var windowHeight = $(this).height();
	scrollLast = $(this).scrollTop();
	scrollBottom = $(this).scrollTop() + $(this).height();

	var vertCenterSelectors = [
		'.hero .copy.left',
		'.hero .copy.right',
		'.our-platform-sections',
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
	$('.header-container').slideUp();
	$('.footer-container').hide();
	$('.content.our-platform').panelSnap({
		panelSelector: '> .container',
		directionThreshold: 20,
		slideSpeed: 400,
	});

});


// ------------------------------------
// Scrolling pagination
// ------------------------------------
/*
// Global variables
var scrollLast = 0;
var scrollCurrent = 0;
var scrollDirection = false;
var scrollBottom = 0;

// Cribbed scroll velocity detector, to deal with inertia scrolling
var scrollVelocity = 0;
var velocityRating = 1;
function calculateVelocity() {
    scrollLast = scrollCurrent;
    scrollCurrent = $('#content').scrollTop();
    scrollVelocity = scrollLast - scrollCurrent;
    if (scrollVelocity > 20 || scrollVelocity < -20) {
        velocityRating = 5;
    } else {
        velocityRating = 1;
    }
}

$('#content').scroll(function () {
    // get velocity while scrolling...
    calculateVelocity();
    // wait until finished scrolling...
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
        // do your animation
        $('#content').animate({scrollTop: snapPoint}, 300);
    }, 300*velocityRating)); // short or long duration...
});


// could probably elegantly convert this using the debounce plugin?
$(function() {
	var timer;
	$(window).scroll(function() {
		scrollCheck = $(this).scrollTop();
		scrollDistance = scrollCheck - scrollLast;
		scrollLast = scrollCheck;
    	clearTimeout(timer);
    	timer = setTimeout(function() {
      		$(window).trigger('scrollStop');
    	}, 250);
    	scrollLast = scrollCheck;
  	});
});

$(window).on('touchmove', function() {
	console.log('touchmove triggered');
});

// $(window).bind('touchmove', function() {
// 	console.log('moving!');
// })

$(window).bind('scrollStop', function() {
	var currentPage = {};

	function scrollCheckPage() {
		for (var i = 0; i < pagesLength; i++) {
			if (pages[i].top === null) {
				return;
			}
			if (window.scrollY < pages[i].top) {
				if ((i - 1) > -1) {
					currentPage = pages[i - 1];
				}
			}
			break;
		}
	}

	// if (scrollDirection === 'down') {

	// }
	// else if (scrollDirection === 'up') {

	// }
	// else {
	// 	// don't change the page, but align it if we're on a page
	// }

	for (var i = 0; i < pagesLength; i++) {
		if (pages[i].top === null) {
			return;
		}
		if (window.scrollY < pages[i].top) {
			// window.scrollTo(0, currentPage.top);
			if ((i - 1) > -1) {
				currentPage = pages[i - 1];
			}
			break;
		}
		else {
			if (window.scrollY >= pages[i].top) {
				// console.log(scrollDirection + ' ' + (window.scrollY - pages[i].top));
				currentPage = pages[i];
			}
			else {
				continue;
			}
		}
	}
	if ($.isEmptyObject(currentPage)) {
		return;
	}
	else {
		window.scrollTo(0, currentPage.top);
	}

});
*/

/*

mimic OSX PDF preview scroll behavior:
	check scroll direction, see if top/bottom is in a certain area within a certain number of pixels, then scroll to that element

*/
