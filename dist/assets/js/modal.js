function modalHandler (e) {
    e.preventDefault()
    var modalClass = '.modal-container.' + $(this).data('modal')
    if ($(modalClass).length) {
        var $modalEl = $(modalClass)
        modalToggle($modalEl)
    }
    return false
}

function modalClose (e) {
    e.preventDefault()
    var $modalEl = $(this).closest('.modal-container')
    modalToggle($modalEl)
}

function modalToggle ($modalEl) {
    $modalEl.toggleClass('modal-active')
    $('body').toggleClass('modal-active-body')
}

$(document).ready(function () {
    enquire.register('screen and (max-width: 1000px)', {
        match: function () {
            $('.modal-link').bind('click', modalHandler)
            $('.modal-close').bind('click', modalClose)
        },
        unmatch: function () {
            $('.modal-link').unbind('click', modalHandler)
            $('.modal-close').unbind('click', modalClose)
            $('.modal-active').removeClass('modal-active')
        },
    })
})
