var gulp = require('gulp')
var sass = require('gulp-sass')
var handleErrors = require('../util/handleErrors')

var config = require('../config').sass


gulp.task('sass', function () {
    return gulp.src(config.src)
        .pipe(sass({
            style: 'compressed',
            'sourcemap=none': true,
        }))
        .on('error', handleErrors)
        .pipe(gulp.dest(config.dest))
})
