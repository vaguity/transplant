require('js/lib/modernizr');
global.$ = global.jQuery = require('jquery');
require('js/enquire-shim');
global.enquire = require('js/lib/enquire');
global.throttleDebounce = require('js/lib/jquery.ba-throttle-debounce.min').Cowboy;
global.$.extend(global.$, global.throttleDebounce);

global.setVerticalCenter = require('js/vertical-center').setVerticalCenter;
global.setFullFrame = require('js/full-frame').setFullFrame;
global.stickySetup = require('js/sticky').stickySetup;
global.videoHero = require('js/video-hero').videoHero;
