var config = require('../config')
var gulp = require('gulp')
var gulpif = require('gulp-if')
var gulpWebpack = require('webpack-stream')
var handleErrors = require('../util/handleErrors')
var livereload = require('gulp-livereload')
var webpack = require('webpack')


gulp.task('build', function () {
    var watchCheck = isWatching
    var webpackConfig = require('../webpack.config.js')

    return gulp.src(config.src + '/main.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .on('error', handleErrors)
        .pipe(gulp.dest(webpackConfig.output.path))
        .pipe(gulpif(watchCheck, livereload()))
})
