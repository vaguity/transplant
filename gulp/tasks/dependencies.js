var components = require('../../bower.json')
var config = require('../config')
var del = require('del')
var gulp = require('gulp')
var gulpif = require('gulp-if')
var handleErrors = require('../util/handleErrors')
var mainBowerFiles = require('main-bower-files')
var rename = require('gulp-rename')

var modernizr = require('modernizr')
var modernizrConfig = require('../modernizr.config.json')
var fs = require('fs')


gulp.task('clean:dependencies', function () {
    return del([config.bower.src], { force: true })
})

gulp.task('rebuild:dependencies', ['clean:dependencies'], function () {
    return gulp.src(mainBowerFiles({ includeDev: 'exclusive' }), { base: 'bower_components' })
        .pipe(gulp.dest(config.bower.src))
})

gulp.task('process:dependencies', ['rebuild:dependencies'], function () {
    var processDependency = function (dependency) {
        var dependencyRenameCheck = typeof dependency.rename !== 'undefined'
        var dependencySource = config.bower.src + '/' + dependency.name

        if (typeof dependency.path !== 'undefined') {
            dependencySource += dependency.path
        }
        if (typeof components.overrides[dependency.name] !== 'undefined') {
            dependencySource += '/' + components.overrides[dependency.name].main
        } else {
            dependencySource += '/**'
        }

        return gulp.src(dependencySource)
            .pipe(gulpif(dependencyRenameCheck, rename(dependency.rename)))
            .on('error', handleErrors)
            .pipe(gulp.dest(dependency.dest))
    }

    config.bower.packages.forEach(processDependency)
})

gulp.task('npm:dependencies', ['process:dependencies'], function () {
    modernizr.build(modernizrConfig, function (result) {
        fs.writeFile(config.npm.dest.jsLib + '/modernizr.js', result)
    })
})

gulp.task('dependencies', ['npm:dependencies'])
