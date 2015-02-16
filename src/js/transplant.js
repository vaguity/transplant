// Enquire shim
var mediaQueryCheck = Modernizr.mq('only all');
if (!mediaQueryCheck) {
	jQuery('html').addClass('no-mediaqueries');
	window.matchMedia = window.matchMedia || function() {
		return {
			matches: false,
			addListener : function() {},
			removeListener: function() {}
		}
	};
}

var footerPadding;
var stickyTop, stickyBottom, stickySections, stickySection, stickySectionNew;

function stickySetup() {
	if ($('.sticky-begin').length) {
		stickyTop = $('.sticky-begin').position().top;
	}
	if ($('.sticky-end').length) {
		stickyBottom = $('.sticky-end').position().top;
	}
	if ($('.sticky-sections').length) {
		stickySections = $('.sticky-section').length;
	}
}

function stickyCalc() {
	if (stickyTop === null) {
		return;
	}

	if ((window.scrollY + $(window).height()) > stickyBottom) {
		$('.sticky, .sticky-begin, .sticky-end').removeClass('enabled');
	}
	else if (stickyTop < window.scrollY) {
		$('.sticky, .sticky-begin, .sticky-end').addClass('enabled');
	}
	else {
		$('.sticky, .sticky-begin, .sticky-end').removeClass('enabled');
	}

	if ($('.sticky').hasClass('sticky-sections')) {

		for (var i = 0; i < stickySections; i++) {
			if ((window.scrollY + $('.sticky').height()) > $('.sticky-section').eq(i).position().top) {
				stickySectionNew = i;
			}
			// check where the scroll is
			// highlight that number list item in menu
		}
		if (stickySection === stickySectionNew) {
			return;
		}
		else {
			stickySection = stickySectionNew;
			$('.sub-nav li').removeClass('active').eq(stickySection).addClass('active');
		}
	}
}

function stickyNav(set) {
	if (set === true) {
		$(window).on('scroll', $.throttle(150, function() {
			if ($('.sticky').length === 0) {
				$(window).off('scroll', window);
			}

			stickyCalc();
		}));
	}
	else {
		$(window).off('scroll');
		$('.sticky').removeClass('enabled');
		$('.sticky-begin').removeClass('enabled');
	}
}

$(document).ready(function() {
	$('.nav-icon').click(function() {
		$('.primary-nav, .secondary-nav').toggle();
	});
});

$(window).load(function() {
	if ($('.footer-container').length) {
		if ($('body').height() < $(window).height()) {
			footerPadding = $(window).height() - $('body').height();
			$('.footer-container').css('padding-bottom', footerPadding + 'px');
		}
	}
	stickySetup();
});

$(window).on('resize', $.throttle(300, function() {
	stickySetup();
}));

enquire
.register("screen and (min-width: 1000px)", {
	// Handle switch between previously toggled nav and desktop breakpoint
	setup: function() {
		stickyCalc();
	},
	match: function() {
		$('.primary-nav, .secondary-nav').attr('style', '');
		stickyNav(true);
	},
	unmatch: function() {
		$('.primary-nav, .secondary-nav').css('display', 'none');
		stickyNav(false);
	},
})
.register("screen and (min-width: 1000px) and (max-width: 1180px)", {
	match: function() {
		$('.secondary-nav .jobs-link').text('Jobs');
	},
	unmatch: function() {
		$('.secondary-nav .jobs-link').text('We’re Hiring');
	},
});
