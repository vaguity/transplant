var path = require('path')
var webpack = require('webpack')
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

var rootDir = path.resolve(__dirname, '..')
var srcDir = path.resolve(rootDir, 'src')
var distDir = path.resolve(rootDir, 'dist/assets')
var nodeModulesDir = path.resolve(rootDir, 'node_modules')

var uglifyOptions = {
    compress: {
        warnings: false,
    },
    comments: false,
    sourceMap: false,
}

var entries = {
    transplant: srcDir + '/transplant.js',
    guide: srcDir + '/guide.js',
    grid: srcDir + '/grid.js',
    product: srcDir + '/product.js',
}

var config = {
    context: rootDir,
    entry: entries,
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
            },
            { test: /\.png$/, loader: 'url-loader?limit=8192&mimetype=image/png' },
            { test: /\.(jpg|gif)$/, loader: 'file-loader' },
            { test: /modernizr\.js$/, loader: 'imports?this=>window!exports?window.Modernizr' },
        ],
    },
    output: {
        path: distDir,
        filename: '[name].js',
        publicPath: '/assets/',
    },
    resolve: {
        fallback: nodeModulesDir,
        root: srcDir,
    },
    resolveLoader: {
        root: nodeModulesDir,
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(uglifyOptions),
        new CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
            chunks: ['transplant', 'guide', 'grid', 'product'],
        }),
    ],
}

module.exports = config
