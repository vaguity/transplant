// Set up offsets for full frame calculations as well?

var fullFrameSelectors = [
	'.content.our-platform',
	'.content.our-platform > .panel-container',
	{
		'selector': '.body-container .image.left',
		'offset': '.sticky',
	},
	{
		'selector': '.content.our-platform > .panel-container-offset',
		'offset': '.sticky',
	},
];

var vertCenterSelectors = [
	{
		'selector': '#customize .copy.right',
		'offset': '.sticky',
	},
	{
		'selector': '#planning .copy.right',
		'offset': '.sticky',
	},
	{
		'selector': '#briefing .copy.right',
		'offset': '.sticky',
	},
	{
		'selector': '#sourcing .copy.right',
		'offset': '.sticky',
	},
	{
		'selector': '#production .copy.right',
		'offset': '.sticky',
	},
	{
		'selector': '#distribution .copy.right',
		'offset': '.sticky',
	},
	{
		'selector': '#monitoring .copy.right',
		'offset': '.sticky',
	},
	{
		'selector': '#analysis .copy.right',
		'offset': '.sticky',
	},
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
			vertCenterPad = (windowHeight - $(selectors[i]['selector']).height() - $(selectors[i]['offset']).outerHeight()) / 2;
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
	enquire.register('screen and (min-width: 1180px)', {
		deferSetup: true,
		setup: function() {
			setFullFrame(fullFrameSelectors);
			setVerticalCenter(vertCenterSelectors);
			$('.content.our-platform')
				.panelSnap({
					panelSelector: '> .panel-container',
					directionThreshold: 20,
					slideSpeed: 400,
					offset: $('.sticky').outerHeight(),
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
			$('.content.our-platform').scroll($.throttle(150, function() {
				if ($('.content.our-platform').scrollTop() >= ($(window).height() - $('.sticky').outerHeight())) {
					$('.sticky').addClass('enabled').css('display', 'block');
				}
				else {
					$('.sticky').removeClass('enabled').css('display', '');
				}
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
