require('./main')
require('./form')
require('./hide')
require('./activate')
require('./modal')
require('./sticky')
require('./video-hero')

global.stickySetup = require('./sticky').stickySetup
global.videoHero = require('./video-hero').videoHero
global.formsRedirect = require('./form').formsRedirect
global.formsValidateRequired = require('./form').formsValidateRequired
global.formsValidateEmail = require('./form').formsValidateEmail
global.formsStyleReset = require('./form').formsStyleReset
