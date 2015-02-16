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

var stickyTop, stickyBottom;

// Mobile navigation

$(document).ready(function() {
	$('.nav-icon').click(function() {
		$(this).toggleClass('nav-toggle');
		$('.primary-nav, .secondary-nav').toggle();
	});
});

$(window).load(function() {
	if ($('.footer-container').length) {
		if ($('body').height() < $(window).height()) {
			var footerPadding = $(window).height() - $('body').height();
			$('.footer-container').css('padding-bottom', footerPadding + 'px');
		}
	}

	stickySetRange();
});

$(window).on('resize', $.throttle(300, function() {
	stickySetRange();
}));

function stickySetRange() {
	if ($('.sticky-begin').length) {
		stickyTop = $('.sticky-begin').position().top;
	}
	if ($('.sticky-end').length) {
		stickyBottom = $('.sticky-end').position().top;
	}
}

function stickyNav(set) {
	if (set === true) {
		$(window).on('scroll', $.throttle(100, function() {
			if ($('.sticky').length === 0) {
				$(window).off('scroll', window);
			}
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
		}));
	}
	else {
		$(window).off('scroll');
		$('.sticky').removeClass('enabled');
		$('.sticky-begin').removeClass('enabled');
	}
}

enquire.register("screen and (min-width: 1180px)", {
	// Handle switch between previously toggled nav and desktop breakpoint
	match: function() {
		$('.primary-nav, .secondary-nav').show();
		stickyNav(true);
	},
	unmatch: function() {
		$('.primary-nav, .secondary-nav').hide();
		stickyNav(false);
	}
});
