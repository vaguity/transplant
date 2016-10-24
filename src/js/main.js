$(document).ready(function () {
    $('.nav-icon').click(function () {
        $('.header-container').toggleClass('modal-active')
        $('body').toggleClass('modal-active')
        $('.header-container.modal-active a').on('click', function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                $('.header-container.modal-active a').off('click')
                $('.header-container').toggleClass('modal-active')
                $('body').toggleClass('modal-active')
            }
        })
    })

    enquire
    .register('screen and (min-width: 930px) and (max-width: 1080px)', {
        match: function () {
            $('.secondary-nav .careers').css('display', 'none')
        },
        unmatch: function () {
            $('.secondary-nav .careers').css('display', 'inline-block')
        },
    })
})

$(window).on('load', function () {
    if ($('.footer-container').length) {
        var footerPadding
        if ($('body').height() < $(window).height()) {
            footerPadding = $(window).height() - $('body').height()
            $('.footer-container').css('padding-bottom', footerPadding + 'px')
        }
    }
})
