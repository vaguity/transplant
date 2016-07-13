require('./main')
require('./forms')
require('./hide')
require('./activate')
require('./modal')
require('./sticky')
require('./video-hero')

global.stickySetup = require('./sticky').stickySetup
global.videoHero = require('./video-hero').videoHero
global.formsStandardRedirect = require('./forms').formsStandardRedirect
global.formsAgencyRedirect = require('./forms').formsAgencyRedirect
global.formsValidateRequired = require('./forms').formsValidateRequired
global.formsValidateEmail = require('./forms').formsValidateEmail
global.formsStyleReset = require('./forms').formsStyleReset
