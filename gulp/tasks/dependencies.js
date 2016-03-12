var config = require('../config')
var del = require('del')
var fs = require('fs')
var gulp = require('gulp')
var gulpif = require('gulp-if')
var handleErrors = require('../util/handleErrors')
var modernizr = require('modernizr')
var modernizrConfig = require('../modernizr.config.json')
var rename = require('gulp-rename')


gulp.task('clean:dependencies', function () {
    return del([config.staticDependencies.src], { force: true })
})

gulp.task('process:dependencies', ['clean:dependencies'], function () {
    var processDependency = function (dependency) {
        var dependencyRenameCheck = typeof dependency.rename !== 'undefined'
        var dependencySource = './node_modules/' + dependency.name

        if (typeof dependency.path !== 'undefined') {
            dependencySource += dependency.path
        } else {
            dependencySource += '/**'
        }

        return gulp.src(dependencySource)
            .pipe(gulpif(dependencyRenameCheck, rename(dependency.rename)))
            .on('error', handleErrors)
            .pipe(gulp.dest(dependency.dest))
    }

    config.staticDependencies.packages.forEach(processDependency)
})

gulp.task('build:dependencies', ['process:dependencies'], function () {
    modernizr.build(modernizrConfig, function (result) {
        fs.writeFile(config.buildDependencies.modernizr.dest + '/modernizr.js', result)
    })
})

gulp.task('dependencies', ['build:dependencies'])
