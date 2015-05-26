var frameHeight;

function fullFrameRatio(el) {
	if (($(window).width() / frameHeight) < el['ratio']) {
		$(el['selector']).css('width', parseInt(frameHeight * el['ratio']) + 'px');
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
		frameHeight = $(el['match']).outerHeight();
	}
	if (typeof el['offset'] === 'string') {
		frameHeight = frameHeight - $(el['offset']).outerHeight();
	}
	$(el['selector']).css('height', frameHeight + 'px');
	if (typeof el['ratio'] === 'number') {
		fullFrameRatio(el);
	}
}

function setFullFrame(el, reset) {
	if (reset === true) {
		frameHeight = '';
	}
	else {
		frameHeight = $(window).height();
	}

	if (typeof el === 'string') {
		$(el).css('height', frameHeight);
	}
	else {
		for (var i = 0; i < el.length; i++) {
			if (typeof el[i] === 'object') {
				fullFrameObject(el[i]);
			}
			else {
				$(el[i]).css('height', frameHeight + 'px');
			}
		}
	}
}

module.exports.setFullFrame = setFullFrame;
