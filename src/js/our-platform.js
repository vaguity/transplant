var fullFrameSelectors = [
	'.content.our-platform',
	'.content.our-platform > .panel-container',
	'.body-container .image.left',
	{
		'selector': '.content.our-platform > .panel-container-offset',
		'offset': '.sticky',
	},
	{
		'selector': '.wistia-embed',
		'offset': '.header-container',
		'ratio': 16 / 9,
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

$(document).ready(function() {
	enquire.register('screen and (min-width: 1180px)', {
		deferSetup: true,
		setup: function() {
			setFullFrame(fullFrameSelectors);
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
	enquire.register('screen and (min-width: 1180px)', {
		deferSetup: true,
		setup: function() {
			$('.content.our-platform')
				.panelSnap({
					panelSelector: '> .panel-container',
					directionThreshold: 20,
					slideSpeed: 400,
					offset: $('.sticky').outerHeight(),
				});
			$('.content.our-platform .hero .copy').fadeIn();
			$('.content.our-platform').scroll($.throttle(150, function() {
				if ($('.content.our-platform').scrollTop() >= ($(window).height() - $('.sticky').outerHeight())) {
					$('.sticky').addClass('enabled').css('display', 'block');
				}
				else {
					$('.sticky').removeClass('enabled').css('display', '');
				}
			}));
			$(window).resize($.throttle(150, function() {
				setFullFrame(fullFrameSelectors);
				setVerticalCenter(vertCenterSelectors);
			}));
		},
		match: function() {
			setFullFrame(fullFrameSelectors);
			setVerticalCenter(vertCenterSelectors);
			$('.content.our-platform').panelSnap('enable');
		},
		unmatch: function() {
			setFullFrame(fullFrameSelectors, true);
			$('.content.our-platform').panelSnap('disable');
		},
	});
});
