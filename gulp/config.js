var dist = './dist';
var src = './src';

var packageType = {
	cssPartial: src + '/scss/lib/reset',
	cssLib: src + '/scss/lib',
	jsLib: src + '/js/lib'
};

var config = {
	buildMethod: 'webpack',
	// buildMethod: false,
	sass: {
		src: src + '/scss/**/*.scss',
		dest: src + '/css',
		dist: dist + '/assets/css',
	},
	js: {
		src: src + '/js/**/*.js',
		dist: dist + '/assets/js',
	},

	bower: {
		src: src + '/lib',
		packages: [
			{
				name: 'compass-breakpoint',
				dest: packageType.cssLib,
			},
			{
				name: 'enquire',
				path: '/dist',
				dest: packageType.jsLib,
			},
			{
				name: 'html5-boilerplate',
				rename: '_html5bp.scss',
				dest: packageType.cssPartial,
			},
			{
				name: 'jquery',
				path: '/dist',
				dest: packageType.jsLib,
			},
			{
				name: 'jquery-throttle-debounce',
				dest: packageType.jsLib
			},
			{
				name: 'modernizr',
				dest: packageType.jsLib,
			},
			{
				name: 'normalize-scss',
				dest: packageType.cssPartial,
			},
			{
				name: 'panelsnap',
				dest: packageType.jsLib,
			},
			{
				name: 'susy',
				dest: packageType.cssLib,
			},
		],
	},
};

module.exports = config;
