function modalHandler (e) {
    e.preventDefault()
    var modalClass = '.modal-container.' + $(this).data('modal-class')
    if ($(modalClass).length) {
        var $modalEl = $(modalClass)
        modalToggle($modalEl)
    }
    return false
}

function modalClose (e) {
    e.preventDefault()
    var $modalEl = $(this).closest('.modal-container')
    modalDisable($modalEl)
}

function modalToggle ($modalEl) {
    $modalEl.toggleClass('modal-active')
    $('body').toggleClass('modal-active-body')
    $('.modal-mask').toggleClass('active')
}

function modalDisable ($modalEl) {
    $modalEl.removeClass('modal-active')
    $('body').removeClass('modal-active-body')
    $('.modal-mask').removeClass('active')
}

$(document).ready(function () {
    $('.modal-link').on('click', modalHandler)
    $('.modal-close').on('click', modalClose)

    enquire
    .register('screen and (min-width: 1000px)', {
        deferSetup: true,
        setup: function () {
            $('.modal-active').removeClass('modal-active')
            $('.modal-active-body').removeClass('modal-active-body')
            $('.modal-mask').removeClass('active')
        },
        match: function () {
            $('.modal-active').removeClass('modal-active')
            $('.modal-active-body').removeClass('modal-active-body')
            $('.modal-mask').removeClass('active')
        },
    })

    $('.modal-mask').click(function () {
        modalDisable($('.modal-active'))
    })

    $(document).keydown(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which)
        if (keycode === 27) {
            modalDisable($('.modal-active'))
        }
    })
})
