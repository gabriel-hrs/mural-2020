window.Popper = require('popper.js');

window.$ = window.jQuery = require('jquery');
require('bootstrap');

jQuery(document).ready(function ($) {
    $('.carousel').on('slide.bs.carousel', function (evt) {
        $('#carousel .nav li.active').removeClass('active');
        $('#carousel .nav li:eq(' + $(evt.relatedTarget).index() + ')').addClass('active');
    })
});