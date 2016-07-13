/* global ga:true */

function formsRedirect (url) {
    location.href = url
}

/**
 * After a form is filled out, runs any trackers and redirects the user.
 * @param  {array} values - Values passed from the form
 * @param  {string} url - URL of the redirect
 * @param  {number} formID - Marketo form ID
 * @param  {array|function} [tracking] - Tracking function or array of tracking functions
 */
function formsStandardRedirect (values, url, formID, tracking) {
    var delay = false
    if (typeof ga !== 'undefined') {
        ga('send', 'event', 'Marketo Form', 'Submit', formID)
        delay = true
    }
    if (typeof tracking !== 'undefined') {
        if (typeof tracking === 'object') {
            for (var i = tracking.length - 1; i >= 0; i--) {
                tracking[i]()
            }
        }
        else if (typeof tracking === 'function') {
            tracking()
        }
    }
    if (delay) {
        setTimeout(function () { formsRedirect(url) }, 400)
    }
    else {
        formsRedirect(url)
    }
}

/**
 * After a form is filled out, runs any trackers and redirects the user. Includes agency redirect.
 * @param  {array} values - Values passed from the form
 * @param  {string} url - URL of the redirect
 * @param  {number} formID - Marketo form ID
 * @param  {array|function} [tracking] - Tracking function or array of tracking functions
 */
function formsAgencyRedirect (values, url, formID, tracking) {
    var delay = false
    if (typeof ga !== 'undefined') {
        ga('send', 'event', 'Marketo Form', 'Submit', formID)
        delay = true
    }
    if (typeof tracking !== 'undefined') {
        if (typeof tracking === 'object') {
            for (var i = tracking.length - 1; i >= 0; i--) {
                tracking[i]()
            }
        }
        else if (typeof tracking === 'function') {
            tracking()
        }
    }
    if ('Job_Function__c' in values) {
        if (values['Job_Function__c'] === 'Agency or Consultant') {
            url = 'https://percolate.com/request-demo?success=2'
        }
    }
    if (delay) {
        setTimeout(function () { formsRedirect(url) }, 400)
    }
    else {
        formsRedirect(url)
    }
}

/**
 * @param  {object} $fields
 * @param  {number} formID
 * @returns {boolean} Status of validation
 */
function formsValidateRequired ($fields, formID) {
    var validationStatus = true
    $fields.each(function () {
        if ($(this).hasClass('mktoLogicalField')) {
            if ($(this).children('input').prop('checked') === false) {
                $('.mktoCustomError_' + formID).html('<strong>Uh oh.</strong> Please fill out all the fields.').css('display', 'block')
                validationStatus = false
                return false
            }
        }
        else if ($(this).val() === '') {
            $('.mktoCustomError_' + formID).html('<strong>Uh oh.</strong> Please fill out all the fields.').css('display', 'block')
            validationStatus = false
            return false
        }
    })
    return validationStatus
}

/**
 * @param  {string} email
 * @param  {number} formID
 * @returns {boolean} Status of validation
 */
function formsValidateEmail (email, formID) {
    var validationStatus = true
    var emailDomain = email.replace(/.+@(.+)/, '\$1')
    var personalDomains = ['aol.com', 'att.net', 'bellsouth.net', 'comcast.net', 'cox.net', 'earthlink.net', 'gmail.com', 'gmx.com', 'gmx.de', 'googlemail.com', 'hotmail.co.uk', 'hotmail.com', 'icloud.com', 'live.com', 'mac.com', 'mail.com', 'mail.ru', 'me.com', 'msn.com', 'outlook.com', 'rocketmail.com', 'sbcglobal.net', 'verizon.net', 'web.de', 'yahoo.co.uk', 'yahoo.com', 'yandex.ru', 'ymail.com']
    for (var i = personalDomains.length - 1; i >= 0; i--) {
        if (emailDomain === personalDomains[i]) {
            validationStatus = false
            $('.mktoCustomError_' + formID).html('<strong>Uh oh.</strong> Please enter your company email address.').css('display', 'block')
            return false
        }
    }
    return validationStatus
}

function formsStyleReset (formSelector, formDisplay) {
    $('#mktoForms2BaseStyle, #mktoForms2ThemeStyle').remove()
    $(formSelector + ' style').remove()
    $(formSelector + ', ' + formSelector + ' .mktoFormRow, ' + formSelector + ' .mktoFieldDescriptor, ' + formSelector + ' .mktoField, ' + formSelector + ' .mktoHasWidth, ' + formSelector + ' .mktoButtonWrap').removeAttr('style')
    $('.mktoAsterix, .mktoOffset, .mktoClear, .mktoLabel, .mktoGutter, .mktoError').remove()

    if ($(formSelector + ' .mktoLogicalField').length) {
        var formCheckboxLabel = $(formSelector + ' .mktoLogicalField').attr('title')
        $(formSelector + ' .mktoLogicalField label').text(formCheckboxLabel)
    }

    enquire.register('screen and (min-width: 1000px)', {
        match: function () {
            $(formSelector).find('.mktoFieldDescriptor, .mktoFieldWrap').css('display', formDisplay)
            $(formSelector + ' textarea').closest('.mktoFormRow').css('display', 'block')
        },
        unmatch: function () {
            $(formSelector).find('.mktoFormRow, .mktoFieldDescriptor, .mktoButtonRow, .mktoFieldWrap').css('display', '')
        },
    })

    $(formSelector).css('visibility', 'visible')
}

module.exports.formsStandardRedirect = formsStandardRedirect
module.exports.formsAgencyRedirect = formsAgencyRedirect
module.exports.formsValidateRequired = formsValidateRequired
module.exports.formsValidateEmail = formsValidateEmail
module.exports.formsStyleReset = formsStyleReset
