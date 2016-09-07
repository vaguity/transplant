# Transplant: The Percolate marketing front-end library

Staging: [prototype.marketing.prclt.com/transplant](http://prototype.marketing.prclt.com/transplant)

This is an NPM package to include in marketing projects as a dependency.

## Use

Transplant should be included in a project's `package.json` and used with Gulp tasks.

- Includes the following CSS/Sass dependencies for consistent use across applications:
    - Susy
    - Breakpoint
    - Normalize
    - HTML5 Boilerplate
- Requires the following JavaScript dependencies to be loaded for use:
    - Modernizr
    - jQuery
    - enquire.js (and a shim for enquire)
    - Underscore
    - Picturefill

## Contents

### src/js

Various JS modules and functions are included in separate files here. The relevant parts of external libraries are committed under `/lib`.

### src/scss

Bundled styles are included here in directories, with modules in subdirectories. External libraries are committed under `/lib`.

### src/

Webpack bundles are added here. This is mostly for local development -- JS and Sass should be loaded by the project separately and not load the full bundle.


## Development

HTML files for various templates are included in `/dist`. Serve those files from that directory locally with `npm run up` in the root directory.

Run the following in the root directory before making changes:

`npm install`  
`gulp dependencies`  
`gulp build` or `gulp`  

The `gulp` command automatically builds and starts watching.

Bump the version using a git version tag if changes are made to the CSS, Sass or JavaScript. Strict versioning is necessary for the projects that use Transplant.


## Deployment

The `/dist` directory is also uploaded to the Marketing Prototype S3 Bucket at [http://prototype.marketing.prclt.com/transplant](http://prototype.marketing.prclt.com/transplant). The HTML files in `/dist` should include thorough examples of what the library contains.

```bash
aws s3 sync dist s3://prototype.marketing.prclt.com/transplant --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --exclude "*.git/*"
```
