var manualOffset
var newHeroOffset

function videoHeroSetup () {
    if ($('.wistia-embed').length) {
        if (typeof $('.wistia-embed').data('manual-offset') === 'number') {
            manualOffset = $('.wistia-embed').data('manual-offset')
        }
    }
}

function videoHero (set, height) {
    if (set === true && $('.wistia-embed').length) {
        if ($('.wistia-embed').data('mask-reset') !== true) {
            if (typeof height !== 'undefined') {
                newHeroOffset = typeof manualOffset === 'number' ? manualOffset : parseInt((height - $('.hero-video-container').height()) / 2, 10)
            }
            else {
                var videoHeroRatio = $('.wistia-embed').width() / $('.wistia-embed').height()
                var newHeroHeight = parseInt($(window).width() / videoHeroRatio, 10)
                newHeroOffset = typeof manualOffset === 'number' ? manualOffset : parseInt((newHeroHeight - $('.hero-video-container').height()) / 2, 10)
            }
            $('.wistia-embed').css({
                top: '-' + newHeroOffset + 'px',
            })
        }
        $('.wistia-container').animate({
            opacity: 1,
        }, 1000)
    }
    else {
        $('.wistia-container').attr('style', '')
    }
}

$(window).load(function () {
    enquire.register('screen and (min-width: 1180px)', {
        setup: function () {
            videoHeroSetup()
        },
        match: function () {
            videoHero(true)
            if (typeof wistiaVideoHero !== 'undefined') {
                wistiaVideoHero.play()
            }
            $(window).on('resize', _.debounce(function () {
                videoHero(true)
            }, 300))
        },
        unmatch: function () {
            videoHero(false)
            $(window).on('resize', _.debounce(function () {
                videoHero(false)
            }, 300))
        },
    })
})

module.exports.videoHero = videoHero
