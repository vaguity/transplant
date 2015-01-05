var gulp = require('gulp');
var gulpif = require('gulp-if');
var merge = require('merge-stream');
var livereload = require('gulp-livereload');
var rubySass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var handleErrors = require('../util/handleErrors');

var config = require('../config').sass;


gulp.task('sass', function() {
	return gulp.src(config.src)
		.pipe(rubySass({
			style: 'compressed',
			"sourcemap=none": true
		}))
		.on('error', handleErrors)
		.pipe(gulp.dest(config.dest));
});
