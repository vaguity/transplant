var mediaQueryCheck = Modernizr.mq('only all')
if (!mediaQueryCheck) {
    $('html').addClass('no-mediaqueries')
    window.matchMedia = window.matchMedia || function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {},
        }
    }
}
