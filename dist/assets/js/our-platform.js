var fullFrameSelectors = [
	'.body-container .image.left',
	'.content.our-platform',
	'.content.our-platform > .container',
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
		'selector': '.hero-container .mask',
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
			$(selectors[i]['selector']).css({
				'padding-top': vertCenterPad + 'px',
				'padding-bottom': vertCenterPad + 'px',
			});

			continue;
		}

		vertCenterPad = (windowHeight - $(selectors[i]).height()) / 2;
		$(selectors[i]).css({
			'padding-top': vertCenterPad + 'px',
			'padding-bottom': vertCenterPad + 'px',
		});
	}
}

function setFullFrame(el) {
	var windowHeight = $(window).height();

	if (typeof el === 'string') {
		$(el).css('height', windowHeight + 'px');
	}
	else {
		for (var i = 0; i < el.length; i++) {
			$(el[i]).css('height', windowHeight + 'px');
		};
	}
}

// Check for if it's in between the two and enable/disable accordingly
// No need to do position: fixed

$(document).ready(function() {

	enquire.register('screen and (min-width: 1180px)', {
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
		},
		match: function() {
			setVerticalCenter(vertCenterSelectors);
		},
		unmatch: function() {
			setVerticalCenter(vertCenterSelectors, true);
		},
	});

});
