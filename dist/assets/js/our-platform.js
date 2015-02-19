// Set up offsets for full frame calculations as well?

fullFrameSelectors = fullFrameSelectors.concat([
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
]);

vertCenterSelectors = vertCenterSelectors.concat([
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
]);


$(document).ready(function() {
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
		},
		match: function() {
			$('.content.our-platform').panelSnap('enable');

		},
		unmatch: function() {
			$('.content.our-platform').panelSnap('disable');
		},
	});

});

$(window).load(function() {
	enquire.register('screen and (min-width: 1180px)', {
		deferSetup: true,
		setup: function() {
			$('.content.our-platform .hero .copy').fadeIn();
			$('.content.our-platform').scroll($.throttle(150, function() {
				if ($('.content.our-platform').scrollTop() >= ($(window).height() - $('.sticky').outerHeight())) {
					$('.sticky').addClass('enabled').css('display', 'block');
				}
				else {
					$('.sticky').removeClass('enabled').css('display', '');
				}
			}));
		},
		unmatch: function() {
			$('.content.our-platform').panelSnap('disable');
		},
	});
});
