$(document).ready(function () {
    $('.nav-icon').click(function () {
        if ($('.header-modal-active').length) {
            setFullFrame('.header-modal-active', true)
            $('.header-modal-active').removeClass('header-modal-active')
        }
        else {
            setFullFrame('.header-modal-active')
            $('.header .primary-nav, .header .secondary-nav').attr('style', '')
            $('.header-container').addClass('header-modal-active')
        }
    })

    enquire
    .register('screen and (min-width: 1000px)', {
        match: function () {
            $('.header .primary-nav, .header .secondary-nav').attr('style', '')
            $('.header-modal-active').removeClass('header-modal-active')
        },
        unmatch: function () {
            $('.header .primary-nav, .header .secondary-nav').css('display', 'none')
        },
    })
    .register('screen and (min-width: 1000px) and (max-width: 1100px)', {
        match: function () {
            $('.header .secondary-nav .jobs-link').text('Jobs')
        },
        unmatch: function () {
            $('.header .secondary-nav .jobs-link').text('We’re Hiring')
        },
    })
})

$(window).load(function () {
    if ($('.footer-container').length) {
        var footerPadding
        if ($('body').height() < $(window).height()) {
            footerPadding = $(window).height() - $('body').height()
            $('.footer-container').css('padding-bottom', footerPadding + 'px')
        }
    }
})
