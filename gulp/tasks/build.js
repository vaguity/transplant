var gulp = require('gulp');
var gulpif = require('gulp-if');
var livereload = require('gulp-livereload');
var merge = require('merge-stream');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var handleErrors = require('../util/handleErrors');

var config = require('../config');


gulp.task('build', ['sass'], function() {

	var watchCheck = typeof isWatching !== 'undefined' ? true : false;

	// Webpack build
	// if (config.buildMethod == 'webpack') {

		var webpackConfig = require('../webpack.config.js');

		var webpackBundle = gulp.src(config.src + '/main.js')
			.pipe(gulpWebpack(webpackConfig, webpack))
			.pipe(gulp.dest(webpackConfig.output.path))
			.pipe(gulpif(watchCheck, livereload()));
	// }
	// Standard build
	// else {

		var styles = gulp.src(config.sass.dest + '/*.css')
			.pipe(gulp.dest(config.sass.dist));

		var scripts = gulp.src(config.js.src)
			.on('error', handleErrors)
			.pipe(gulp.dest(config.js.dist));

		// var reload = gulp.src('')
			// .pipe(gulpif(watchCheck, livereload()));

		return merge(webpackBundle, styles, scripts);
	// }

});
