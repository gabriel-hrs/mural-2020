$(document).ready(function($) {
    var Body = $('body');
    Body.addClass('preloader-site');
});
$(document).ready(function($) {
    $('.preloader-wrapper').delay( 3000 ).fadeOut();
    $('body').removeClass('preloader-site');
});