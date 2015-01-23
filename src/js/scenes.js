$(document).ready(function($) {
	if ($('.parallax-fixed').length) {
	$('.parallax-fixed').height($('.hero').height());
		// init controller
		var controller = new ScrollMagic({ globalSceneOptions: { triggerHook: 'onLeave' } });

		// build scenes
		var scene1 = new ScrollScene({
			triggerElement: '.parallax-fixed',
			// duration: $('.parallax-fixed').height(),
		})
		.setPin('.parallax-fixed > div')
		.setClassToggle('.parallax-fixed > div', 'pinned');

		var scene2 = new ScrollScene({
			triggerElement: '.footer-container',
			duration: $('.footer-container').height()
		})
		.on('enter', function(e) {
			console.log('scene2 triggered');
		});

		controller.addScene([scene1, scene2]);
	}
});
