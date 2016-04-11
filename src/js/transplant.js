require('./main')
require('./hide')
require('./activate')
require('./modal')
require('./sticky')
require('./video-hero')
// require('./vertical-center')
// require('./full-frame')

global.stickySetup = require('./sticky').stickySetup
global.videoHero = require('./video-hero').videoHero
// global.setVerticalCenter = require('./vertical-center').setVerticalCenter
// global.setFullFrame = require('./full-frame').setFullFrame

