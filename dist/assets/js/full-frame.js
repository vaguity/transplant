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
				if (typeof el[i]['match'] === 'string') {
					windowHeight = $(el[i]['match']).outerHeight();
				}
				if (typeof el[i]['offset'] === 'string') {
					windowHeight = windowHeight - $(el[i]['offset']).outerHeight();
				}
				$(el[i]['selector']).css('height', windowHeight + 'px');
				if (typeof el[i]['ratio'] === 'number') {
					if (($(window).width() / windowHeight) < el[i]['ratio']) {
						$(el[i]['selector']).css('width', parseInt(windowHeight * el[i]['ratio']) + 'px');
					}
					else {
						$(el[i]['selector']).css({
							'width': '100%',
							'height': ($(window).width() / el[i]['ratio']) + 'px',
						});
					}
				}
			}
			else {
				$(el[i]).css('height', windowHeight + 'px');
			}
		}
	}
}

module.exports.setFullFrame = setFullFrame;
