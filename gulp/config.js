var dist = './dist';
var src = './src';

var packageType = {
	cssPartial: src + '/scss/lib/reset',
	cssLib: src + '/scss/lib',
	jsLib: src + '/js/lib'
};

var config = {
	// buildMethod: 'webpack',
	buildMethod: false,
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
				name: 'normalize-scss',
				dest: packageType.cssPartial,
			},
			{
				name: 'html5-boilerplate',
				rename: '_html5bp.scss',
				dest: packageType.cssPartial,
			},
			{
				name: 'modernizr',
				dest: packageType.jsLib,
			},
			{
				name: 'jquery',
				path: '/dist',
				dest: packageType.jsLib,
			},
			{
				name: 'enquire',
				path: '/dist',
				dest: packageType.jsLib,
			},
			{
				name: 'susy',
				dest: packageType.cssLib,
			},
			{
				name: 'compass-breakpoint',
				dest: packageType.cssLib,
			},
			{
				name: 'ScrollMagic',
				path: '/js',
				dest: packageType.jsLib,
			},
		]
	},
};

module.exports = config;
