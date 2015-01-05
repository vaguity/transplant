var path = require('path');
var webpack = require('webpack');

var rootDir = path.resolve(__dirname, '..');
var srcDir = path.resolve(rootDir, 'src');
var distDir = path.resolve(rootDir, 'dist/assets');
var nodeModulesDir = path.resolve(rootDir, 'node_modules');
var recordsFile = path.resolve(__dirname, 'webpack.records.json');

var uglifyEnvOptions = {
	production: {
		compress: {
			warnings: false,
			drop_console: true
		},
		comments: false,
		sourceMap: false
	},
	development: {
		sourceMap: true,
		compress: false,
		mangle: false,
		beautify: true,
		comments: true
	}
};

var uglifyOptions = typeof isProduction !== 'undefined' ? uglifyEnvOptions.production : uglifyEnvOptions.development;

var config = {
	context: rootDir,
	entry: srcDir + '/entry.js',
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style!css' },
			{ test: /\.png$/, loader: 'url-loader?limit=8192&mimetype=image/png' },
			{ test: /\.(jpg|gif)$/, loader: 'file-loader' },
			{ test: /modernizr\.js$/, loader: 'imports?this=>window!exports?window.Modernizr' }
		]
	},
	output: {
		path: distDir,
		filename: 'bundle.js',
		publicPath: '/assets/'
	},
	resolve: {
		fallback: nodeModulesDir,
		root: srcDir
	},
	resolveLoader: {
		root: nodeModulesDir
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(uglifyOptions)
	]
};

module.exports = config;
