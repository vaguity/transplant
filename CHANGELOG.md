# Transplant changelog

## 2.0.0

- Changed link mixin construction
- Changed button mixin construction
- Changed `.btn` class to just use button mixin
- Removed purple palette alias
- Removed transparent palette colors
- Added mask mixin
- Added `.segment` class for when `<section>` isn't semantically appropriate
- Rebuilt promo section
- Updated footer structure
- Changed how vertical margins interact
- Changed how `.copy` containers work
- Updated blue in the palette
- Removed `.pad` and `.margin` helpers for sections and segments
- Standardized `.copy` as inline-block with flush helpr classes
- Change form styling
- Remove hero-, demo-, and contact form-specific styling
- Changed how modal functions work
- Changed hero height
- Changed modal structure
- Added typography mixins with breakpoints
- Added hide script
- Added activate script

## 2.0.1

- Fixed `img.border` handling at smaller layouts to prevent horizontal scroll
- Updated product overview layout
- Added semantic subhed handling to heroes
- Removed borders on `.desktop-show` demo form

## 2.0.2

- Set up full-width header
- Set up sub-nav
- Fixed modal form border handling
- Re-added video hero handling
- Upgraded normalize and fixed placeholder opacity
- Edited header primary-nav list item horizontal margin
- Fixed header navs vertical margins
- Added button cursor reset originally covered by Normalize

## 2.1.0

- Made `.copy` full-width
- Changed padding on `.container.full.bleed .segment.full` so behavior is explicit with `.container.full.bleed .segment.full.bleed`

## 2.1.1

- Updated `.hero a` to explicit element states
- Updated link mixin defaults

## 2.1.2

- Fixed link mixin variable scope

## 2.1.3

- Changed desktop form field sizes and margins

## 2.1.4

- Updated Node modules
- Removed transparent border around highlighted button in header
- Add webfonts to project

## 2.2.0

- Restart basic sticky nav implementation

## 2.2.1

- Change icon alignment handling
- Change `.modal-container` full-width so it's not floated out of the document flow

## 2.3.0

- Remove full-frame and vertical-center functions
- Move Marketo form functions into Transplant

## 2.3.1

- Add agency redirect function

## 2.3.2

- Add event tracking to redirect functions
- Change form checkbox label to inline-block

## 2.3.3

- Fix header nav spacing with new links

## 2.3.4

- Set delay before redirect in the case of logging GA events
- Add additional tracking tag function handling

## 3.0.0

- Update breakpoints
- Update layout
- Add layout modules
- Remove default global styles for semantic tags

## 3.0.1

- Update jQuery, handle breaking changes

## 3.0.2

- Add gravity helper class for stacked alt-background elements
- Add alternate hero style
- Remove update class for base layouts

## 3.0.3

- Change structure of Jupiter
- Clean up copy margins for modules
- Don't use inline-block on module segments
- Alternate second row of Constellation
- Support multiple image sets in Constellation

## 3.0.4

- Add gravity helper for all modules
- Expand Kuiper Belt gutter
- Add border-box sizing to Earth images
- Fix Earth image containers

## 3.0.5

- Update Saturn to handle copy and adjust spacing
- Center Saturn image
- Don't expand width of sub-nav

## 3.0.6

- Add typography variables for InterFace typeface
- Add documentation on asset sizes
- Adjust header links
- Allow sub-nav to appear below desktop breakpoint
- Update forms styling reset breakpoint
- Update sticky nav and modal enquire calls to 930px

## 3.1.0

- Add Mercury module
- Limit Constellation to 8 images in a row
- Widen Uranus and Neptune gutters
- Adjust Uranus and Neptune copy margins proportionally
- Deprecate .pad-mobile class included with Neptune
- Expand Jupiter image to full width
- Adjust max width for Neptune, Venus, Saturn, Kuiper Belt, and Mercury (860px, 1280px)

## 3.1.1

- Add Supernova Type III to style guide
- Style checkbox field in Supernova Type III form
- Style .hero-subhed class under Supernova

## 3.1.2

- Remove Neptune expanded child margins at large breakpoint
- Lock Orbit at 1280px max-width

## 3.1.3

- Update style and add subnav functionality to modal mobile navigation

## 3.1.4

- Update Supernova Type III padding and add bleed class

## 3.1.5

- Fix Sentinel weights

## 3.2.0

- Add `section-hed` element to be used across modules
- Add Sol
- Add Pluto
- Update Supernova and hero markup structure
- Add Supernova variants
- Add Triton variant of Neptune with new typography, unrestricted image height
- Add Nereid variant of Neptune with unrestricted image height
- Reconfigure Earth
- Change Orbit to body copy
- Remove copy from Jupiter, make Jupiter image full-width
- Remove Uranus labels
- Update Saturn typography
- Limit Orbit to 1000px
- Limit Mercury to 600px
- Limit Supernova contents to 1600px
- Add `.kepler-form` to Supernova Type III
- Add `sentinel-margins` mixin to handle Sentinel line-height/margin issue
- Update icon-down image for use with dropdown menus
- Update dependencies
- Update Futura webfont
- Remove unused markup files
- Add prospective names file

## 3.2.1

- Adjust section hed margins when on alt-background
- Fix Orbit margin at desktop width
- Correct Ceres module spacing
- Fix Constellation margin stacking
- Add image sizes to text, add image sizes file

## 3.2.2

- Fix Ceres display settings, add card markup
- Limit Pluto copy max-width
- Add hanging quote to Orbit
- Limit Saturn and Ceres to 1000px
- Refactor Supernova
- Fix `sentinel-margins` mixin to calculate margins correctly
- Remove `sentinel` class from child-margins mixin
