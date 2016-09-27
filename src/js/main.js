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
