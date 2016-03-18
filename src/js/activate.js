function activateHandler (e) {
    e.preventDefault()
    var activateClass = '.activate-container.' + $(this).data('activate')
    if ($(activateClass).length) {
        var $modalEl = $(activateClass)
        activateToggle($modalEl)
    }
    return false
}

function activateClose (e) {
    e.preventDefault()
    var $modalEl = $(this).closest('.modal-container')
    activateToggle($modalEl)
}

function activateToggle ($activateEl) {
    $activateEl.toggleClass('activate-active')
    if ($activateEl.hasClass('activate-scroll-lock')) {
        $('body').toggleClass('activate-active-body')
    }
}

$(document).ready(function () {
    $('.activate').bind('click', activateHandler)
    $('.activate-close').bind('click', activateClose)
})
