function modalHandler (e) {
    e.preventDefault()
    var modalClass = '.modal-container.' + $(this).data('modal-class')
    if ($(modalClass).length) {
        var $modalEl = $(modalClass)
        modalToggle($modalEl)
    }
    console.log('modalHandler activated')
    return false
}

function modalClose (e) {
    e.preventDefault()
    var $modalEl = $(this).closest('.modal-container')
    modalDisable($modalEl)
    console.log('modalClose activated')
}

function modalToggle ($modalEl) {
    $modalEl.toggleClass('modal-active')
    $('body').toggleClass('modal-active-body')
    $('.modal-mask').toggleClass('active')
    console.log('modalToggle activated')
}

function modalDisable ($modalEl) {
    $modalEl.removeClass('modal-active')
    $('body').removeClass('modal-active-body')
    $('.modal-mask').removeClass('active')
    console.log('modalDisable activated')
}

$(document).ready(function () {
    $('.modal-link').bind('click', modalHandler)
    $('.modal-close').bind('click', modalClose)

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
})
