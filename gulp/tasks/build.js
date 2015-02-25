var gulp = require('gulp');
var gulpif = require('gulp-if');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var merge = require('merge-stream');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var handleErrors = require('../util/handleErrors');

var config = require('../config');


gulp.task('build', ['sass'], function() {

	global.isProduction = typeof global.isProduction !== 'undefined' ? global.isProduction : undefined;
	var watchCheck = typeof isWatching !== 'undefined' ? true : false;

	// Webpack build
	if (config.buildMethod == 'webpack') {

		var webpackConfig = require('../webpack.config.js');

		return gulp.src(config.src + '/main.js')
			.pipe(gulpWebpack(webpackConfig, webpack))
			.pipe(gulp.dest(webpackConfig.output.path))
			.pipe(gulpif(watchCheck, livereload()));
	}
	// Standard build
	else {

		var styles = gulp.src(config.sass.dest + '/*.css')
			.pipe(gulp.dest(config.sass.dist));

		var scripts = gulp.src(config.js.src)
			.on('error', handleErrors)
			.pipe(gulp.dest(config.js.dist));

		// var scriptsmin = gulp.src(config.js.src)
		// 	.pipe(uglify())
		// 	.pipe(rename({ suffix: '.min' }))
		// 	.on('error', handleErrors)
		// 	.pipe(gulp.dest(config.js.dist));

		var reload = gulp.src('')
			.pipe(gulpif(watchCheck, livereload()));

		return merge(styles, scripts, reload);
	}

});
