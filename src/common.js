require('js/lib/modernizr');
global.$ = global.jQuery = require('jquery');
require('js/enquire-shim');
global.enquire = require('js/lib/enquire');
global.throttleDebounce = require('js/lib/jquery.ba-throttle-debounce.min').Cowboy;
global.$.extend(global.$, global.throttleDebounce);
