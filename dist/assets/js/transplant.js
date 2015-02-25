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


var vertCenterSelectors = [];

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
			vertCenterPad = parseInt((windowHeight - $(selectors[i]['selector']).height() - offsetValue) / 2);
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

		vertCenterPad = parseInt((windowHeight - $(selectors).height()) / 2);
		$(selectors).css({
			'padding-top': vertCenterPad + 'px',
			'padding-bottom': vertCenterPad + 'px',
		});
	}
}

$(document).ready(function() {
	enquire.register('screen and (min-width: 1180px)', {
		deferSetup: true,
		setup: function() {
			setVerticalCenter(vertCenterSelectors);
		},
	});
});

$(window).load(function() {
	enquire.register('screen and (min-width: 1180px)', {
		deferSetup: true,
		setup: function() {
			setVerticalCenter(vertCenterSelectors);
			$(window).resize($.throttle(150, function() {
				setVerticalCenter(vertCenterSelectors);
			}));
		},
		match: function() {
			setVerticalCenter(vertCenterSelectors);
		},
		unmatch: function() {
			setVerticalCenter(vertCenterSelectors, true);
		},
	});
});


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
				var windowHeightOffset = windowHeight - $(el[i]['offset']).outerHeight();
				$(el[i]['selector']).css('height', windowHeightOffset + 'px');
				if (typeof el[i]['ratio'] === 'number') {
					if (($(window).width() / windowHeightOffset) < el[i]['ratio']) {
						$(el[i]['selector']).css('width', parseInt(windowHeightOffset * el[i]['ratio']) + 'px');
					}
					else {
						$(el[i]['selector']).css({
							'width': '100%',
							'height': ($(window).width() / el[i]['ratio']) + 'px',
						});
					}
				}
			}
			else {
				$(el[i]).css('height', windowHeight + 'px');
			}
		}
	}
}


function videoHero(set, height) {
	if (set === true && $('.wistia-embed').length) {
		if ($('.wistia-embed').data('mask-reset') !== true) {
			if (typeof height !== 'undefined') {
				var newHeroOffset = parseInt((height - $('.hero-video-container').height()) / 2);
			}
			else {
				var videoHeroRatio = $('.wistia-embed').width() / $('.wistia-embed').height();
				var newHeroHeight = parseInt($(window).width() / videoHeroRatio);
				var newHeroOffset = parseInt((newHeroHeight - $('.hero-video-container').height()) / 2);
			}
			$('.wistia-embed').css({
				'top': '-' + newHeroOffset + 'px',
			});
		}
		$('.wistia-container').css('display', 'block');
	}
	else {
		$('.wistia-container').attr('style', '');
	}
}

$(window).load(function() {
	enquire.register('screen and (min-width: 1180px)', {
		match: function() {
			videoHero(true);
			$(window).off('resize');
			$(window).on('resize', $.debounce(300, function() {
				videoHero(true);
			}));
		},
		unmatch: function() {
			$(window).off('resize');
			$(window).on('resize', $.debounce(300, function() {
				videoHero(false);
			}));
		},
	});
});

