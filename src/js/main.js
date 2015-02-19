var footerPadding;

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
});

enquire.register("screen and (min-width: 1000px) and (max-width: 1180px)", {
	match: function() {
		$('.secondary-nav .jobs-link').text('Jobs');
	},
	unmatch: function() {
		$('.secondary-nav .jobs-link').text('We’re Hiring');
	},
});
