var panels = [
	{
		id: '#customize',
		top: null,
	},
	{
		id: '#planning',
		top: null,
	},
	{
		id: '#briefing',
		top: null,
	},
	{
		id: '#sourcing',
		top: null,
	},
	{
		id: '#production',
		top: null,
	},
	{
		id: '#distribution',
		top: null,
	},
	{
		id: '#monitoring',
		top: null,
	},
	{
		id: '#analysis',
		top: null,
	},
];

var panelsLength = panels.length;

var panelSetParameters = {
	'container': '.content.our-platform',
	'selectors': '.hero-container .mask, .hero-container .hero, .body-container .image.left',
};

var vertCenterSelectors = [
	'.hero .copy.left',
	'.hero .copy.right',
	'.our-platform-sections',
	'#customize .copy.right',
	'#planning .copy.right',
	'#briefing .copy.right',
	'#sourcing .copy.right',
	'#production .copy.right',
	'#distribution .copy.right',
	'#monitoring .copy.right',
	'#analysis .copy.right',
];

function verticalCenter(selectors, reset) {

	var vertCenterLength = selectors.length;
	var vertCenterPad = 0;

	if (reset === true) {
		for (var i = 0; i < vertCenterLength; i++) {
			$(selectors[i]).attr('style', '');
		}
		return;
	}

	var windowHeight = $(this).height();

	for (var i = 0; i < vertCenterLength; i++) {
		vertCenterPad = (windowHeight - $(selectors[i]).height()) / 2;
		$(selectors[i]).css({
			'padding-top': vertCenterPad + 'px',
			'padding-bottom': vertCenterPad + 'px'
		});
	}
}

function setFullFrame(element) {
	var windowHeight = $(window).height();

	$(element).css('height', windowHeight + 'px');
}

function panelSet(status, parameters) {
	if (status === true) {

		$(parameters.container).panelSnap('enable');

		// setFullFrame('.our-platform-placeholder, .content.our-platform');

		setStickyRange();

		if ((window.scrollY + $(window).height()) > stickyBottom) {
			// console.log('scrollY + height: ' + (window.scrollY + $(window).height()));
			// console.log('stickyBottom: ' + stickyBottom);
			$(parameters.container).panelSnap('disable');
			// panelSet(false, panelSetParameters);
		}

		// $(parameters.selectors).css('min-height', windowHeight + 'px');
		// $(parameters.container).css({
		// 	'height': windowHeight + 'px',
		// 	'overflow-x': 'hidden'
		// })
		// .panelSnap('enable');

		return;
	}

	$(parameters.selectors).attr('style', '');

	$(parameters.container).attr('style', '').panelSnap('disable');
}

// Check for if it's in between the two and enable/disable accordingly
// No need to do position: fixed

$(window).load(function() {

	enquire.register('screen and (min-width: 1180px)', {
		deferSetup: true,
		setup: function() {
			verticalCenter(vertCenterSelectors);
			$(panelSetParameters.container).panelSnap({
				panelSelector: '> .container',
				directionThreshold: 20,
				slideSpeed: 400,
			});
			panelSet(false, panelSetParameters);
		},
		match: function() {
			verticalCenter(vertCenterSelectors);
			$(window).scroll(function() {
				if ((window.scrollY + $(window).height()) > $('.our-platform-end').position().top) {
					console.log('disable');
					$(panelSetParameters.container).panelSnap('disable');
				}
				else if (window.scrollY > $('.header-container').height()) {
					console.log('enable');
					$(panelSetParameters.container).panelSnap('enable');
				}
			});

		},
		unmatch: function() {
			panelSetup(true, panelSetParameters);
			verticalCenter(vertCenterSelectors, true);
		},
	});



	// for (var i = 0; i < pagesLength; i++) {
	// 	pages[i].top = $(pages[i].id).position().top;
	// }


	// Panel Snap setup


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
