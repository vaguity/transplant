var fullFrameSelectors = [
	'.body-container .image.left',
	'.content.our-platform',
	'.content.our-platform > .panel-container',
];

var vertCenterSelectors = [
	'#customize .copy.right',
	'#planning .copy.right',
	'#briefing .copy.right',
	'#sourcing .copy.right',
	'#production .copy.right',
	'#distribution .copy.right',
	'#monitoring .copy.right',
	'#analysis .copy.right',
	{
		'selector': '.hero-container section',
		'offset': '.header-container',
	},
];

function setVerticalCenter(selectors, reset) {

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
		if (typeof selectors[i] === 'object') {
			vertCenterPad = (windowHeight - $(selectors[i]['selector']).height() - $(selectors[i]['offset']).height()) / 2;
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

		vertCenterPad = (windowHeight - $(selectors[i]).height()) / 2;
		$(selectors[i]).css({
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
		var windowHeight = $(window).height() + 'px';
	}

	if (typeof el === 'string') {
		$(el).css('height', windowHeight);
	}
	else {
		for (var i = 0; i < el.length; i++) {
			$(el[i]).css('height', windowHeight);
		}
	}
}

$(document).ready(function() {
	enquire.register('screen and (min-width: 1180px)', {
		deferSetup: true,
		setup: function() {
			setFullFrame(fullFrameSelectors);
			setVerticalCenter(vertCenterSelectors);
			$('.content.our-platform')
				.panelSnap({
					panelSelector: '> .container',
					directionThreshold: 20,
					slideSpeed: 400,
				});
		},
		match: function() {
			setFullFrame(fullFrameSelectors);
			$('.content.our-platform').panelSnap('enable');

		},
		unmatch: function() {
			setFullFrame(fullFrameSelectors, true);
			$('.content.our-platform').panelSnap('disable');
		},
	});

});

$(window).load(function() {
	enquire.register('screen and (min-width: 1180px)', {
		deferSetup: true,
		setup: function() {
			setVerticalCenter(vertCenterSelectors);
			$('.content.our-platform .hero .copy').fadeIn();
			$(window).resize($.throttle(150, function() {
				setVerticalCenter(vertCenterSelectors);
				setFullFrame(fullFrameSelectors);
			}));
			$('window').on('scroll', $.throttle(150, function() {
				console.log(window.scrollY);
			}));
		},
		match: function() {
			setVerticalCenter(vertCenterSelectors);
		},
		unmatch: function() {
			setFullFrame(fullFrameSelectors, true);
			setVerticalCenter(vertCenterSelectors, true);
			$('.content.our-platform').panelSnap('disable');
		},
	});
});
