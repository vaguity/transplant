function modalHandler (e) {
    e.preventDefault()
    var modalClass = '.modal-container.' + $(this).data('modal')
    if ($(modalClass).length) {
        var $modalEl = $(modalClass)
        modalToggle($modalEl)
    }
}

function modalClose (e) {
    e.preventDefault()
    var $modalEl = $(this).closest('.modal-container')
    modalToggle($modalEl)
}

function modalToggle ($modalEl) {
    $modalEl.toggleClass('modal-active')
}

$(document).ready(function () {
    enquire.register('screen and (max-width: 720px)', {
        match: function () {
            $('.modal-link').bind('click', modalHandler)
            $('.modal-close').bind('click', modalClose)
        },
        unmatch: function () {
            $('.modal-link').unbind('click', modalHandler)
            $('.modal-close').unbind('click', modalClose)
        },
    })
})
