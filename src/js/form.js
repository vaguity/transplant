function formsRedirect (values, url) {
    if ('Job_Function__c' in values) {
        if (values['Job_Function__c'] === 'Agency or Consultant') {
            url = 'https://percolate.com/request-demo?success=2'
        }
    }
    location.href = url
}

// Returns true or false depending on the status of fields
function formsValidateRequired ($fields, formID) {
    var validationStatus = true
    $fields.each(function () {
        if ($(this).hasClass('mktoLogicalField')) {
            if ($(this).children('input').prop('checked') === false) {
                console.log('no checkbox')
                $('.mktoCustomError_' + formID).html('<strong>Uh oh.</strong> Please fill out all the fields.').css('display', 'block')
                validationStatus = false
                return false
            }
        }
        else if ($(this).val() === '') {
            console.log('missing field')
            $('.mktoCustomError_' + formID).html('<strong>Uh oh.</strong> Please fill out all the fields.').css('display', 'block')
            validationStatus = false
            return false
        }
    })
    return validationStatus
}

function formsValidateEmail (email, formID) {
    var validationStatus = true
    var emailDomain = email.replace(/.+@([^.]+).+/, '\$1')
    var personalDomains = ['gmail', 'hotmail', 'yahoo', 'att', 'facebook', 'ymail', 'google']
    for (var i = personalDomains.length - 1; i >= 0; i--) {
        if (emailDomain === personalDomains[i]) {
            validationStatus = false
            $('.mktoCustomError_' + formID).html('<strong>Uh oh.</strong> Please enter your company email address.').css('display', 'block')
            return false
        }
    }
    return validationStatus
}

// if (typeof marketoForm === 'undefined') {
//     var marketoForm = {};
// }
/*
var marketoFormID = 1083;
var marketoFormSelector = '#mktoForm_' + marketoFormID;
marketoForm[marketoFormID] = {
    'selector': '#mktoForm_' + marketoFormID,
    'redirect-url': $(marketoFormSelector).data('redirect-url'),
    'display': typeof $(marketoFormSelector).data('field-display') !== 'undefined' ? $(marketoFormSelector).data('field-display') : 'inline',
    'marketoLoadForm': function() {},
};

marketoForm[1083]['marketoLoadForm'] = function() {
    $(marketoForm[1083]['selector']).empty();
    MktoForms2.loadForm("//app-sj02.marketo.com", "306-EXV-607", 1083, function(form) {
        form.onSuccess(function(values, followUpUrl) {
            var redirectUrl = marketoForm[marketoFormID]['redirect-url'];
            if ('Job_Function__c' in values) {
                if (values['Job_Function__c'] == 'Agency or Consultant') {
                    redirectUrl = 'https://percolate.com/request-demo?success=2';
                }
            }
            location.href = redirectUrl;
            return false;
        });
        form.onValidate(function(callback) {
            var submittable = true;
            $(marketoForm[1083]['selector']  + ' .mktoRequired').each(function() {
                if ($(this).val() == '') {
                    submittable = false;
                    $('.mktoCustomError_1083').html('<strong>Uh oh.</strong> Please fill out all the fields.').css('display', 'block');
                }
            });
            var emailVal = $(marketoForm[1083]['selector'] + ' input#Email').val();
            var emailDomain = emailVal.replace(/.+@([^.]+).+/, '\$1');
            var i = 0;
            var personalDomains = ['gmail', 'hotmail', 'yahoo'];
            for (i in personalDomains) {
                if (emailDomain == personalDomains[i]) {
                    submittable = false;
                    $('.mktoCustomError_1083').html('<strong>Uh oh.</strong> Please enter your company email address.').css('display', 'block');
                }
            }
            form.submittable(submittable);
        });
    });

    MktoForms2.whenReady(function(form) {
        $('#mktoForms2BaseStyle, #mktoForms2ThemeStyle').remove();
        $(marketoForm[1083]['selector'] + ' style').remove();
        $(marketoForm[1083]['selector'] + ', ' + marketoForm[1083]['selector'] + ' .mktoFormRow, ' + marketoForm[1083]['selector'] + ' .mktoFieldDescriptor, ' + marketoForm[1083]['selector'] + ' .mktoField, ' + marketoForm[1083]['selector'] + ' .mktoHasWidth, ' + marketoForm[1083]['selector'] + ' .mktoButtonWrap').removeAttr('style');
        $('.mktoAsterix, .mktoOffset, .mktoClear, .mktoLabel, .mktoGutter, .mktoError').remove();
        enquire.register("screen and (min-width: 1000px)", {
            match: function() {
                $(marketoForm[1083]['selector']).find('.mktoFieldDescriptor, .mktoFieldWrap').css('display', marketoForm[1083]['display']);
                $(marketoForm[1083]['selector'] + ' textarea').closest('.mktoFormRow').css('display', 'block');
            },
            unmatch: function() {
                $(marketoForm[1083]['selector']).find('.mktoFormRow, .mktoFieldDescriptor, .mktoButtonRow, .mktoFieldWrap').css('display', '');
            }
        });
        $(marketoForm[1083]['selector']).css('visibility', 'visible');

        stickySetup();
    });
}

marketoForm[1083]['marketoLoadForm']();

enquire.register("screen and (max-width: 1000px)", {
    unmatch: function() {
        marketoForm[1083]['marketoLoadForm']();
    }
});
*/

module.exports.formsRedirect = formsRedirect
module.exports.formsValidateRequired = formsValidateRequired
module.exports.formsValidateEmail = formsValidateEmail