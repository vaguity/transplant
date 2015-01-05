var components = require('../../bower.json');
var config = require('../config').bower;
var del = require('del');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var mainBowerFiles = require('main-bower-files');
var rename = require('gulp-rename');


gulp.task('clean:dependencies', function(callback) {
	del([config.src], {force: true}, callback);
});

gulp.task('rebuild:dependencies', ['clean:dependencies'], function() {
	return gulp.src(mainBowerFiles(), { base: 'bower_components'})
		.pipe(gulp.dest(config.src));
});

gulp.task('process:dependencies', ['rebuild:dependencies'], function() {

	var processDependency = function(dependency) {

		var dependencyRenameCheck = typeof dependency.rename !== 'undefined' ? true : false;
		var dependencySource = config.src + '/' + dependency.name;

		if (typeof dependency.path !== 'undefined') {
			dependencySource += dependency.path;
		}
		if (typeof components.overrides[dependency.name] !== 'undefined') {
			dependencySource += '/' + components.overrides[dependency.name].main;
		}
		else {
			dependencySource += '/**';
		}

		return gulp.src(dependencySource)
			.pipe(gulpif(dependencyRenameCheck, rename(dependency.rename)))
			.on('error', handleErrors)
			.pipe(gulp.dest(dependency.dest));
	}

	config.packages.forEach(processDependency);
});

gulp.task('dependencies', ['process:dependencies']);
