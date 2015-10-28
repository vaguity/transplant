var stickyTop
var stickyBottom
var stickySections
var stickySection
var stickySectionNew
var stickyLinkSelector
var scrollOffset

function stickySetup () {
    // Performs size calculations and gathers information on the sticky navs
    if ($('.sticky-begin').length) {
        stickyTop = $('.sticky-begin').position().top
    }
    if ($('.sticky-end').length) {
        stickyBottom = $('.sticky-end').position().top
    }
    if ($('.sticky-sections').length) {
        stickySections = $('.sticky-section').length
    }
    if ($('.sub-nav a.sticky-link').length) {
        stickyLinkSelector = '.sub-nav a.sticky-link'
    }
    else {
        stickyLinkSelector = '.sub-nav a'
    }
}

function stickyMobileCheck () {
    if ($('.sticky-mobile').length) {
        return true
    }
    return false
}

function stickyEnquire () {
    // Enquire call to enable or disable the function depending on screen size
    if (stickyMobileCheck()) {
        stickyNav(true)
    }
    else {
        enquire.register('screen and (min-width: 1000px)', {
            match: function () {
                stickyNav(true)
            },
            unmatch: function () {
                stickyNav(false)
            },
        })
    }
}

function stickyCalc () {
    stickySetup()

    if ((window.scrollY + $(window).height()) > stickyBottom) {
        $('.sticky, .sticky-begin, .sticky-end').removeClass('enabled')
    }
    else if (stickyTop < window.scrollY) {
        $('.sticky, .sticky-begin, .sticky-end').addClass('enabled')
    }
    else {
        $('.sticky, .sticky-begin, .sticky-end').removeClass('enabled')
    }

    if ($('.sticky').hasClass('sticky-sections')) {
        stickySectionNew = null
        for (var i = 0; i < stickySections; i++) {
            if ((window.scrollY + $('.sticky').outerHeight()) > $('.sticky-section').eq(i).position().top) {
                stickySectionNew = i
            }
        }
        if (stickySection === stickySectionNew) {
            if ((stickySection === 0) && ((window.scrollY + $('.sticky').outerHeight()) < $('.sticky-section').eq(0).position().top)) {
                $(stickyLinkSelector).removeClass('active').parent('li').removeClass('sticky-menu-active')
            }
            else {
                $(stickyLinkSelector).eq(stickySection).addClass('active').parent('li').addClass('sticky-menu-active')
            }
            return
        }
        else if (stickySectionNew === null) {
            $(stickyLinkSelector).removeClass('active').parent('li').removeClass('sticky-menu-active')
        }
        else {
            stickySection = stickySectionNew
            $(stickyLinkSelector).removeClass('active').parent('li').removeClass('sticky-menu-active')
            $(stickyLinkSelector).eq(stickySection).addClass('active').parent('li').addClass('sticky-menu-active')
        }
    }
}

function stickyNav (set) {
    if (set === true) {
        stickyCalc()
        $(window).bind('scroll', $.throttle(100, function () {
            if ($('.sticky').length === 0) {
                $(window).unbind('scroll')
            }

            stickyCalc()
        }))
    }
    else {
        $(window).unbind('scroll')
        var stickyNavFalse = function () {
            $('.sticky').removeClass('enabled')
            $('.sticky-begin').removeClass('enabled')
        }
        setTimeout(stickyNavFalse, 401)
    }
}

function hashUpdate (hash, href) {
    location.hash = hash
    history.pushState({}, '', href)
}

$(window).resize($.debounce(300, function () {
    stickySetup()
    stickyEnquire()
}))

$(document).ready(function () {
    $('.sub-nav a, a.scroll-to').click(function (e) {
        if ($(this).hasClass('no-scroll')) {
            return false
        }
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            e.preventDefault()
            var newHash = this.hash
            var newHref = this.href
            var target = $(newHash)
            if (target.length > 0) {
                var stickyOffset = $('.sub-nav-container').length > 0 ? $('.sub-nav-container').outerHeight() : 0
                if ($(this).data('sticky-offset') > 0) {
                    stickyOffset += $(this).data('sticky-offset')
                }
                scrollOffset = target.offset().top - stickyOffset + 1
                $('html, body').animate({
                    scrollTop: scrollOffset,
                }, 750)
                setTimeout(function () { hashUpdate(newHash, newHref) }, 751)

                return false
            }
            else {
                scrollOffset = 0
                $('html, body').animate({
                    scrollTop: scrollOffset,
                }, 750)
            }
        }
    })
    stickyEnquire()
})

$(window).bind('hashchange', function () {
    if (typeof scrollOffset === 'number') {
        document.body.scrollTop = scrollOffset
        scrollOffset = undefined
    }
})

$(window).load(function () {
    stickyEnquire()
})

module.exports.stickySetup = stickySetup
