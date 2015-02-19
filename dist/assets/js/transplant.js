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
var videoHeroRatio;
var fullFrameSelectors = [];
var vertCenterSelectors = [];


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

function videoHeroSetup() {
	if ($('.wistia-embed').length) {
		var videoHeroWidth = parseInt($('.wistia-embed').css('width'));
		var videoHeroHeight = parseInt($('.wistia-embed').css('height'));
		videoHeroRatio = videoHeroWidth / videoHeroHeight;
	}
}

function videoHero(set) {
	if (set === true) {
		if ($('.wistia-embed').length) {
			var windowWidth = $(window).width();
			var newHeroHeight = parseInt(windowWidth / videoHeroRatio);
			$('.wistia-embed').css({
				'width': windowWidth + 'px',
				'height': newHeroHeight + 'px',
			});
			$('.hero-video-container .mask').css('height', newHeroHeight + 'px');
			setVerticalCenter([{
				'selector': '.hero-video-container h1',
				'offset': $(window).height() - newHeroHeight,
			}]);
		}
	}
}

function setVerticalCenter(selectors, reset) {

	var vertCenterLength = selectors.length;
	var vertCenterPad = 0;
	if (vertCenterLength < 1) {
		return;
	}

	if (reset === true) {
		for (var i = 0; i < vertCenterLength; i++) {
			$(selectors[i]).attr('style', '');
		}
		return;
	}

	var windowHeight = $(window).height();

	for (var i = 0; i < vertCenterLength; i++) {
		if (typeof selectors[i] === 'object') {
			if (isNaN(selectors[i]['offset']) === true) {
				offsetValue = $(selectors[i]['offset']).outerHeight();
			}
			else {
				offsetValue = selectors[i]['offset'];
			}
			vertCenterPad = (windowHeight - $(selectors[i]['selector']).height() - offsetValue) / 2;
			if (vertCenterPad < 0) {
				vertCenterPad = 0;
				$(selectors[i]['selector']).css({
					'padding-top': '',
					'padding-bottom': '',
				});
			}
			else {
				$(selectors[i]['selector']).css({
					'padding-top': vertCenterPad + 'px',
					'padding-bottom': vertCenterPad + 'px',
				});
			}
			continue;
		}

		vertCenterPad = (windowHeight - $(selectors).height()) / 2;
		$(selectors).css({
			'padding-top': vertCenterPad + 'px',
			'padding-bottom': vertCenterPad + 'px',
		});
	}
}

function setFullFrame(el, reset) {
	if (reset === true) {
		var windowHeight = '';
	}
	else {
		var windowHeight = $(window).height();
	}

	if (typeof el === 'string') {
		$(el).css('height', windowHeight);
	}
	else {
		for (var i = 0; i < el.length; i++) {
			if (typeof el[i] === 'object') {
				$(el[i]['selector']).css('height', (windowHeight - $(el[i]['offset']).outerHeight()) + 'px');
			}
			else {
				$(el[i]).css('height', windowHeight + 'px');
			}
		}
	}
}

$(document).ready(function() {
	$('.nav-icon').click(function() {
		$('.primary-nav, .secondary-nav').toggle();
	});

	enquire.register('screen and (min-width: 1180px)', {
		deferSetup: true,
		setup: function() {
			setFullFrame(fullFrameSelectors);
			setVerticalCenter(vertCenterSelectors);
		},
		match: function() {
			setFullFrame(fullFrameSelectors);

		},
		unmatch: function() {
			setFullFrame(fullFrameSelectors, true);
		},
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
	videoHeroSetup();
	videoHero(true);

	enquire.register('screen and (min-width: 1180px)', {
		deferSetup: true,
		setup: function() {
			setVerticalCenter(vertCenterSelectors);
			$(window).resize($.throttle(150, function() {
				setVerticalCenter(vertCenterSelectors);
				setFullFrame(fullFrameSelectors);
			}));
		},
		match: function() {
			setVerticalCenter(vertCenterSelectors);
		},
		unmatch: function() {
			setFullFrame(fullFrameSelectors, true);
			setVerticalCenter(vertCenterSelectors, true);
		},
	});
});

$(window).on('resize', $.throttle(300, function() {
	stickySetup();
	videoHeroSetup();
	videoHero(true);
}));

enquire
.register("screen and (min-width: 1000px)", {
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
.register("screen and (min-width: 1180px)", {
	match: function() {
		videoHero(true);
	},
	unmatch: function() {
		videoHero(false);
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
