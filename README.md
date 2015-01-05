# Transplant, the Percolate marketing front-end library

This is a bower package to include in marketing projects as a dependency.

## Contents

### The CSS

`dist/assets/css/transplant.css` is the minified, processed CSS built from `src/scss`. It includes reset libraries, layouts, the header and footer styles, and helper classes.

### The Sass

`src/scss/transplant/variables/_base.scss` should be imported into any project so the global variables are made available to any custom styles in a given project.

### The JavaScript

`dist/assets/js/transplant.js` includes a shim for the use of enquire and jQuery and enquire calls to set up the header navigation menu for tablet and mobile. It requires Modernizr, jQuery and enquire to have been loaded first.

## Development

HTML files for the header, footer and a sample page with both the header and footer are included in `/dist`. Serve those files from that directory locally (for example, with `python -m SimpleHTTPServer 8000`).

Run the following in the root directory before making changes:

`npm install`  
`bower install`  
`gulp dependencies`  
`gulp`  

The tasks `gulp sass`, `gulp build` (which also processes Sass), and `gulp watch` are also available. The `gulp` command automatically builds and starts watching.

Bump the version using a git version tag if changes are made to this repository. Each project should use a version tag when including this package.
