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
			if ((window.scrollY + $('.sticky').outerHeight()) > $('.sticky-section').eq(i).position().top) {
				stickySectionNew = i;
			}
		}
		if (stickySection === stickySectionNew) {
			if ((stickySection === 0) && ((window.scrollY + $('.sticky').outerHeight()) < $('.sticky-section').eq(0).position().top)) {
				$('.sub-nav li').removeClass('active');
			}
			else {
				$('.sub-nav li').eq(stickySection).addClass('active');
			}
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

$(window).resize($.throttle(300, function() {
	stickySetup();
}));

enquire.register("screen and (min-width: 1000px)", {
	setup: function() {
		stickyCalc();
	},
	match: function() {
		$('.primary-nav, .secondary-nav').attr('style', '');
		stickySetup();
		stickyNav(true);
	},
	unmatch: function() {
		$('.primary-nav, .secondary-nav').css('display', 'none');
		stickyNav(false);
	},
});

module.exports.stickySetup = stickySetup;
