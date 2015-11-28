
//window.APP_KEY = "23e828f381fab4499ca231237f746ce3737e67040663d54aabcbd9188cb004e5";
//window.CLIENT_KEY = "aa6cf5d76a0f30a0d33795c04146cab29b33f8e75cbf37f339d654f1b60a7451";
window.APP_KEY = "adc687194406b5eb94f0f36c3bd684e41b72e1d0e9b913e3a76178e502513d2c";
window.CLIENT_KEY = "37aa57400c1add3e79e4b943dddaf484a16c53330f0c11472d8cb6a0ba67d410";

NCMB.initialize(APP_KEY, CLIENT_KEY); //mbaasを使えるように

$(function() {
    tappable('.tappable', {
        allowClick : true,
        activeClass : 'tap-active',
        onTap : function(e, dom) {
            // trigger a DOM Event manually
            var event = document.createEvent("HTMLEvents");
            event.initEvent('tappable-tap', true, true);
            dom.dispatchEvent(event);
        }
    });
});


function showSpinner(dom) {
    var opts = {
        lines: 11, // The number of lines to draw
        length: 7, // The length of each line
        width: 4, // The line thickness
        radius: 11, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#999', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
    };

    dom = dom || (function() {
        var screenDom = $('<div class="screen"></div>');
        screenDom.appendTo(document.body);
        return screenDom[0];
    })();

    if (!window.spinner) {
        window.spinner = new Spinner(opts).spin(dom);
    }
}

function hideSpinner() {
    if (window.spinner) {
        window.spinner.stop();
        window.spinner = null;
    }
}
