var gulp = require('gulp')
var gulpif = require('gulp-if')
var livereload = require('gulp-livereload')
var merge = require('merge-stream')
var gulpWebpack = require('webpack-stream')
var webpack = require('webpack')
var handleErrors = require('../util/handleErrors')

var config = require('../config')


gulp.task('build', ['sass'], function () {

    var watchCheck = isWatching
    var webpackConfig = require('../webpack.config.js')

    var webpackBundle = gulp.src(config.src + '/main.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(webpackConfig.output.path))
        .pipe(gulpif(watchCheck, livereload()))

    var styles = gulp.src(config.sass.dest + '/*.css')
        .pipe(gulp.dest(config.sass.dist))

    var scripts = gulp.src(config.js.src)
        .on('error', handleErrors)
        .pipe(gulp.dest(config.js.dist))

    return merge(webpackBundle, styles, scripts)
})
