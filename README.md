# Transplant: The Percolate marketing front-end library

Staging: [prototype.marketing.prclt.com/transplant](http://prototype.marketing.prclt.com/transplant)

This is a bower package to include in marketing projects as a dependency.

## Use

Transplant should be included in a project with a package manager and task runner (e.g., Bower and Gulp).

- Includes the following CSS/Sass dependencies for consistent use across applications:
    - Susy
    - Breakpoint
    - Normalize
    - HTML5 Boilerplate
- Requires the following JavaScript dependencies to be loaded for use:
    - Modernizr
    - jQuery
    - enquire.js (and a strongly suggested shim for enquire)
    - jQuery throttle / debounce

## Contents

### The CSS

`dist/assets/css/transplant.css` is the minified, processed CSS built from `src/scss`. It includes reset libraries, layouts, the header and footer styles, and helper classes.

### The Sass

`src/scss/transplant/variables/` should be imported into any project so the global variables are made available to any custom styles in a given project.

### The JavaScript

`dist/assets/js/transplant.js` includes a shim for the use of enquire and jQuery and enquire calls to set up the header navigation menu for tablet and mobile. It requires Modernizr, jQuery and enquire to have been loaded first.


## Development

HTML files for the header, footer and a sample page with both the header and footer are included in `/dist`. Serve those files from that directory locally with `npm run up`.

Run the following in the root directory before making changes:

`npm install`  
`bower install`  
`gulp dependencies`  
`gulp`  

The tasks `gulp sass`, `gulp build` (which also processes Sass), and `gulp watch` are also available. The `gulp` command automatically builds and starts watching.

Bump the version using a git version tag if changes are made to the CSS, Sass or Javascript. Strict versioning is necessary for the projects that use Transplant.


## Deployment

The `/dist` directory is also uploaded to the Marketing Prototype S3 Bucket at [http://prototype.marketing.prclt.com/transplant](http://prototype.marketing.prclt.com/transplant). The HTML files in `/dist` should include thorough examples of what the library contains.

```bash
aws s3 sync dist s3://prototype.marketing.prclt.com/transplant --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --exclude "*.git/*"
```
