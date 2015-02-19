var fullFrameSelectors = [];

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
			$(window).resize($.throttle(150, function() {
				setFullFrame(fullFrameSelectors);
			}));
		},
		match: function() {
			setFullFrame(fullFrameSelectors);
		},
		unmatch: function() {
			setFullFrame(fullFrameSelectors, true);
		},
	});
});

module.exports.setFullFrame = setFullFrame;
