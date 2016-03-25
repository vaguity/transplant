var src = './src'

var packageType = {
    cssPartial: src + '/scss/lib/reset',
    cssLib: src + '/scss/lib',
    jsLib: src + '/js/lib',
}

var config = {
    sass: {
        src: src + '/scss/**/*.scss',
        dest: src + '/css',
    },
    js: {
        src: src + '/js/**/*.js',
    },
    staticDependencies: {
        src: src + '/lib',
        packages: [
            {
                name: 'breakpoint-sass',
                path: '/stylesheets/**',
                dest: packageType.cssLib,
            },
            {
                name: 'enquire.js',
                path: '/dist/enquire.min.js',
                rename: 'enquire.js',
                dest: packageType.jsLib,
            },
            {
                name: 'html5-boilerplate',
                path: '/dist/css/main.css',
                rename: '_html5bp.scss',
                dest: packageType.cssPartial,
            },
            {
                name: 'jquery',
                path: '/dist/jquery.min.js',
                rename: 'jquery.js',
                dest: packageType.jsLib,
            },
            {
                name: 'normalize-scss',
                path: '/sass/normalize/**',
                dest: packageType.cssPartial,
            },
            {
                name: 'picturefill',
                path: '/dist/picturefill.min.js',
                rename: 'picturefill.js',
                dest: packageType.jsLib,
            },
            {
                name: 'susy',
                path: '/sass/**',
                dest: packageType.cssLib,
            },
            {
                name: 'underscore',
                path: '/underscore-min.js',
                rename: '/underscore.js',
                dest: packageType.jsLib,
            },
        ],
    },
    buildDependencies: {
        src: src + '/lib',
        modernizr: {
            name: 'modernizr',
            dest: packageType.jsLib,
        },
    },
    watch: {
        bundles: src + '/*.js',
    },
}

module.exports = config
