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
    stickySetup();

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
		stickySectionNew = null;
		for (var i = 0; i < stickySections; i++) {
			if ((window.scrollY + $('.sticky').outerHeight()) > $('.sticky-section').eq(i).position().top) {
				stickySectionNew = i;
			}
		}
		if (stickySection === stickySectionNew) {
			if ((stickySection === 0) && ((window.scrollY + $('.sticky').outerHeight()) < $('.sticky-section').eq(0).position().top)) {
				$('.sub-nav a').removeClass('active');
			}
			else {
				$('.sub-nav a').eq(stickySection).addClass('active');
			}
			return;
		}
		else if (stickySectionNew === null) {
			$('.sub-nav a').removeClass('active');
		}
		else {
			stickySection = stickySectionNew;
			$('.sub-nav a').removeClass('active').eq(stickySection).addClass('active');
		}
	}
}

function stickyNav(set) {
	if (set === true) {
		$(window).on('scroll', $.throttle(100, function() {
			if ($('.sticky').length === 0) {
				$(window).off('scroll', window);
			}

			stickyCalc();
		}));
	}
	else {
		$('.sticky').removeClass('enabled');
		$('.sticky-begin').removeClass('enabled');
	}
}

$(window).resize($.debounce(300, function() {
	stickySetup();
	stickyCalc();
}));

$(document).ready(function() {
	$('.sub-nav a, a.scroll-to').click(function(e) {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			e.preventDefault();
	  		var target = $(this.hash);
	  		if (target.length > 0) {
	  			var stickyOffset = $('.sub-nav-container').length > 0 ? $('.sub-nav-container').outerHeight() : 0;
	  			var scrollOffset = target.offset().top - $('.sub-nav-container').outerHeight() + 1;
				$('html, body').animate({
					scrollTop: scrollOffset
				}, 750);
				return false;
			}
			else {
				$('html, body').animate({
		  			scrollTop: 0
				}, 750);
			}
		}
	});
	enquire.register("screen and (min-width: 1000px)", {
		match: function() {
			stickyNav(true);
		},
		unmatch: function() {
			stickyNav(false);
		},
	});
});


module.exports.stickySetup = stickySetup;
