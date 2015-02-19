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
			var windowWidth = $(window).width();
			var newHeroHeight = parseInt(windowWidth / videoHeroRatio);
			$('.wistia-embed').css({
				'width': windowWidth + 'px',
				'height': newHeroHeight + 'px',
				'display': 'block',
			});
			// This needs to appear after; causing a FOUC
			$('.hero-video-container .mask').css('height', newHeroHeight + 'px');
			setVerticalCenter([{
				'selector': '.hero-video-container h1',
				'offset': $(window).height() - newHeroHeight,
			}]);
		}
	}
	else {
		setVerticalCenter(['.hero-video-container h1'], true);
		$('.wistia-embed').attr('style', '');
	}
}

$(window).load(function() {
	videoHeroSetup();

	enquire.register('screen and (min-width: 1180px)', {
		match: function() {
			videoHero(true);
		},
		unmatch: function() {
			videoHero(false);
		},
	});
});

$(window).resize($.throttle(300, function() {
	videoHeroSetup();
	videoHero(true);
}));
