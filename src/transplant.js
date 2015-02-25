var common = require('./common');

require('css/transplant.css');

require('js/main');
require('js/sticky');
require('js/vertical-center');
require('js/full-frame');
require('js/video-hero');

global.setVerticalCenter = require('js/vertical-center').setVerticalCenter;
global.setFullFrame = require('js/full-frame').setFullFrame;
global.stickySetup = require('js/sticky').stickySetup;
global.videoHero = require('js/video-hero').videoHero;
