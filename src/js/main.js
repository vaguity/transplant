$(document).ready(function () {
    $('.nav-icon').click(function () {
        $('.header-container').toggleClass('modal-active')
        $('body').toggleClass('modal-active')
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

    var navToggle

    enquire
    .register('screen and (max-width: 930px)', {
        setup: function () {},
        match: function () {
            $('.primary-nav-link-container a.has-children').on('click', function (e) {
                e.preventDefault()
                $(this).parents('li').siblings().toggleClass('subnav-open')
                $(this).toggleClass('nav-active')
                navToggle = $(this).data('nav')
                $('.primary-sub-nav.' + navToggle).toggleClass('active')
            })
        },
        unmatch: function () {
            $('.primary-nav-link-container a.has-children').unbind('click')
            $('.primary-nav-link-container a.has-children').removeClass('nav-active')
            $('.primary-nav ul li').removeClass('subnav-open')
            $('.primary-sub-nav').removeClass('active')

        },
    })
})
