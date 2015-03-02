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
			$(window).on('resize', $.debounce(300, function() {
				videoHero(true);
			}));
		},
		unmatch: function() {
			$(window).on('resize', $.debounce(300, function() {
				videoHero(false);
			}));
		},
	});
});

module.exports.videoHero = videoHero;
