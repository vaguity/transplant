var gulp = require('gulp');
var livereload = require('gulp-livereload');

var config = require('../config');


gulp.task('watch:set', function() {
	global.isWatching = true;
});

gulp.task('watch:build', ['watch:set', 'build']);

gulp.task('watch', ['watch:set', 'watch:build'], function() {
	livereload.listen();
	gulp.watch(config.sass.src, ['build']);
	gulp.watch(config.js.src, ['build']);
});
