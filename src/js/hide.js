$(document).ready(function () {
    $('.hide-link').click(function (e) {
        e.preventDefault()
        var hideClass = $(this).data('hide-class')
        $('.hide-element.' + hideClass).removeClass('hide')
        $(this).addClass('hide')
        return false
    })
})
