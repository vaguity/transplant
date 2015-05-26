var windowHeight;

function fullFrameRatio(el) {
	if (($(window).width() / windowHeight) < el['ratio']) {
		$(el['selector']).css('width', parseInt(windowHeight * el['ratio']) + 'px');
	}
	else {
		$(el['selector']).css({
			'width': '100%',
			'height': ($(window).width() / el['ratio']) + 'px',
		});
	}
}

function fullFrameObject(el) {
	if (typeof el['match'] === 'string') {
		windowHeight = $(el['match']).outerHeight();
	}
	if (typeof el['offset'] === 'string') {
		windowHeight = windowHeight - $(el['offset']).outerHeight();
	}
	$(el['selector']).css('height', windowHeight + 'px');
	if (typeof el['ratio'] === 'number') {
		fullFrameRatio(el);
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
				fullFrameObject(el[i]);
			}
			else {
				$(el[i]).css('height', windowHeight + 'px');
			}
		}
	}
}

module.exports.setFullFrame = setFullFrame;
