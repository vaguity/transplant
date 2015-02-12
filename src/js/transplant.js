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

var stickyTop = null;

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
	if ($('.sticky').length) {
		stickyTop = $('.sticky').position().top;
	}
});

$(window).on('resize', $.throttle(300, function() {
	if ($('.sticky').length === 0) {
		$(window).off('resize');
	}
	else {
		stickyTop = $('.sticky').position().top;
	}
}));

function stickyNav(set) {
	if (set === true) {
		$(window).on('scroll', $.throttle(100, function() {
			if ($('.sticky').length === 0) {
				$(window).off('scroll');
			}
			if (stickyTop === null) {
				return;
			}
			if (stickyTop < window.scrollY) {
				$('.sticky').addClass('enabled');
				$('.sticky-placeholder').addClass('enabled');
			}
			else {
				$('.sticky').removeClass('enabled');
				$('.sticky-placeholder').removeClass('enabled');
			}
		}));
	}
	else {
		$(window).off('scroll');
		$('.sticky').removeClass('enabled');
		$('.sticky-placeholder').removeClass('enabled');
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
