$(document).ready(function () {
    $('.nav-icon').click(function () {
        $('.header-container').toggleClass('modal-active')
        $('body').toggleClass('modal-active')
    })

    enquire.register('screen and (min-width: 1000px) and (max-width: 1100px)', {
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
