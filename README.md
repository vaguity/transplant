# Static, a front-end framework

This project:

1. puts a number of useful front-end utilities in a task runner,
1. keeps those dependencies tracked by package managers so they're under version control and can be easily updated, and
1. provides a flexible, modifiable workflow in one place that produces an uncluttered front-end setup.


## Quick start

`npm install`  
`bower install`  
`gulp rebuild`  
`gulp`  


## Dependencies

You'll need npm and a global install of gulp and Bower. You'll also need Ruby and a global install of Sass (`gem install sass`).


## Installation

In the root directory:

`npm install`  
`bower intsall`

This installs all the Node modules and Bower components from `package.json` and `bower.json` respectively.

`gulp rebuild`

The rebuild task will process the Bower dependencies listed with the parameters supplied in `gulp/config.js`.

You can then run the default task, `gulp`, which will build the project and watch the specified CSS and JS files. See [Usage](#usage) for a full list of gulp tasks.


## Configuration

### config.js

packageType  
Specifies where the main Bower files of a package should go, used by config.bower.dest

config.sass  
Used by `/tasks/sass.js` and `/tasks/watch.js`; defines src and intermediate dest for Sass files for watch and build purposes

config.js  
Used by `/tasks/watch.js`; defines js files for watch purposes

config.bower  
Used by `/tasks/dependencies.js`; determines where main Bower files get moved for each Bower package. Main bower files are usually specified by a package's `bower.json` in the "main" field.  
.name: package name  
.rename: filename to rename  
.dest: intermediate destination, as specified in the packageType object  
.path: specifies the path of the main Bower files within the Bower package


### webpack.config.js

Specifies [Webpack configuration](http://webpack.github.io/docs/configuration.html). Input, output, and UglifyJS options are specified here. jQuery is also loaded here since it can be handled via the [ProvidePlugin](http://webpack.github.io/docs/list-of-plugins.html#provideplugin) plugin.

## Usage

`gulp`  
Runs `watch`

`gulp watch`
Runs `build` and watches Sass and JS files

`gulp build` / `gulp webpack`  
Builds Sass and JS through Webpack

`gulp rebuild` / `gulp dependencies`  
Processes all dependencies as defined by `config.bower`

`gulp sass`  
Processes Sass files

`gulp deploy` / `gulp compress`  
Runs `build` with production flags for minification and concatenation


## Notes

- Front-end libraries loaded by Webpack need to be added as development dependencies to Bower or npm, then managed in `/gulp/config.js`, `/gulp/webpack.config.js`, and `/src/entry.js` or some combination of the three. This is currently somewhat byzantine because [there isn't an ideal workflow yet](http://blog.npmjs.org/post/101775448305/npm-and-front-end-packaging).

- The Webpack [sass-loader](https://www.npmjs.org/package/sass-loader) is based on node-sass, which is based on libsass, which doesn't offer full support for all Sass features. Right now, this means that Susy breaks. Currently relying on [gulp-ruby-sass](https://www.npmjs.org/package/gulp-ruby-sass) to do the work instead, which means the CSS is built to an intermediate directory and then passed through Webpack.

- LiveReload requires the LiveReload browser extension to work.
