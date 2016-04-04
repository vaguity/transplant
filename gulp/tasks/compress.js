var gulp = require('gulp')


gulp.task('compress:set', function () {
    global.isProduction = true
})

gulp.task('compress', ['compress:set', 'build'])
