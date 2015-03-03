var vertCenterSelectors = [];

function setVerticalCenter(selectors, reset) {

	var vertCenterLength = selectors.length;
	var vertCenterPad = 0;

	if (vertCenterLength < 1) {
		return;
	}

	if (reset === true) {
		for (var i = 0; i < vertCenterLength; i++) {
			$(selectors[i]).attr('style', '');
		}
		return;
	}

	var windowHeight = $(window).height();

	for (var i = 0; i < vertCenterLength; i++) {
		if (typeof selectors[i] === 'object') {
			if (isNaN(selectors[i]['offset']) === true) {
				offsetValue = $(selectors[i]['offset']).outerHeight();
			}
			else {
				offsetValue = selectors[i]['offset'];
			}
			vertCenterPad = parseInt((windowHeight - $(selectors[i]['selector']).height() - offsetValue) / 2);
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

		vertCenterPad = parseInt((windowHeight - $(selectors).height()) / 2);
		$(selectors).css({
			'padding-top': vertCenterPad + 'px',
			'padding-bottom': vertCenterPad + 'px',
		});
	}
}

$(document).ready(function() {
	enquire.register('screen and (min-width: 1180px)', {
		deferSetup: true,
		setup: function() {
			setVerticalCenter(vertCenterSelectors);
		},
	});
});

$(window).load(function() {
	enquire.register('screen and (min-width: 1180px)', {
		deferSetup: true,
		setup: function() {
			setVerticalCenter(vertCenterSelectors);
			$(window).resize($.throttle(150, function() {
				setVerticalCenter(vertCenterSelectors);
			}));
		},
		match: function() {
			setVerticalCenter(vertCenterSelectors);
		},
		unmatch: function() {
			setVerticalCenter(vertCenterSelectors, true);
		},
	});
});

console.log('hi');

module.exports.setVerticalCenter = setVerticalCenter;
