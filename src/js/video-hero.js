var videoHeroRatio;

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
			if ($('.wistia-embed').data('mask-reset') !== true) {
				var windowWidth = $(window).width();
				var newHeroHeight = parseInt(windowWidth / videoHeroRatio);
				$('.wistia-embed').css({
					'width': windowWidth + 'px',
					'height': newHeroHeight + 'px',
				});
				$('.hero-video-container .mask').css('height', newHeroHeight + 'px');
			}
			$('.wistia-embed').css('display', 'block');

			var verticalCenterSelector = typeof $('.wistia-embed').data('selector') !== 'undefined' ? $('.wistia-embed').data('selector') : '.hero-video-container h1';

			setVerticalCenter([{
				'selector': verticalCenterSelector,
				'offset': $(window).height() - newHeroHeight,
			}]);
		}
	}
	else {
		$('.wistia-embed, .hero-video-container .mask, .hero-video-container h1').attr('style', '');
	}
}

$(window).load(function() {
	videoHeroSetup();

	enquire.register('screen and (min-width: 1180px)', {
		match: function() {
			videoHero(true);
			$(window).off('resize');
			$(window).on('resize', $.debounce(300, function() {
				videoHeroSetup();
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
