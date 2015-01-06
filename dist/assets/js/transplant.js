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
});

enquire.register("screen and (min-width: 1180px)", {
	// Handle switch between previously toggled nav and desktop breakpoint
	match: function() {
		$('.primary-nav, .secondary-nav').show();
	},
	unmatch: function() {
		$('.primary-nav, .secondary-nav').hide();
	}
});
