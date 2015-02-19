require('js/lib/modernizr');
global.$ = global.jQuery = require('jquery');
require('js/enquire-shim.js');
global.enquire = require('js/lib/enquire');
global.throttleDebounce = require('js/lib/jquery.ba-throttle-debounce.min.js').Cowboy;
global.$.extend(global.$, global.throttleDebounce);

global.setVerticalCenter = require('js/vertical-center').setVerticalCenter;
global.setFullFrame = require('js/full-frame').setFullFrame;
global.stickySetup = require('js/sticky').stickySetup;
