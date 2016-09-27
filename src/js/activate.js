function activateHandler (e) {
    e.preventDefault()
    var activateClass = '.' + $(this).data('activate')
    var activateBaseClass = '.' + $(this).data('activate-base')
    var activateMenuClass = '.' + $(this).data('activate-menu')
    var activateMenuBaseClass = '.' + $(this).data('activate-menu-base')
    var activateToggleCheck = $(this).data('activate-toggle')

    activateTrigger(activateClass, activateBaseClass, activateToggleCheck)
    activateTrigger(activateMenuClass, activateMenuBaseClass, activateToggleCheck)

    return false
}

function activateTrigger (activateClass, activateBaseClass, activateToggleCheck) {
    if ($(activateClass).length) {
        var $activateEl = $(activateClass)
        var $activateBaseEl = $(activateBaseClass)
        if (typeof activateToggleCheck !== 'undefined') {
            activateToggle($activateEl)
        }
        else {
            activateClear($activateBaseEl)
            activateOpen($activateEl)
        }
    }
}

function activateClear ($activateBase) {
    $activateBase.removeClass('activate-active')
}

function activateOpen ($activateEl) {
    $activateEl.addClass('activate-active')
}

function activateToggle ($activateEl) {
    $activateEl.toggleClass('activate-active')
}

$(document).ready(function () {
    $('.activate').on('click', activateHandler)
})
