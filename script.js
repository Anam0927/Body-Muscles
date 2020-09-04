// -- Maphilight options
$.fn.maphilight.defaults = {
    fill: true,
    fillColor: '0077B6',
    fillOpacity: 0.3,
    stroke: false,
    strokeColor: '153243',
    strokeOpacity: 1,
    strokeWidth: 1,
    fade: true,
    alwaysOn: false,
    neverOn: false,
    groupBy: 'rel',
    wrapClass: true,
    shadow: false,
    shadowX: 0,
    shadowY: 0,
    shadowRadius: 6,
    shadowColor: '153243',
    shadowOpacity: 0.2,
    shadowPosition: 'outside',
    shadowFrom: false
}

$(document).ready(() => {

    // -- image map plug-ins
    $('.map').rwdImageMaps().maphilight();

});