$(document).ready(function() {

    /* Botão + Toggle do Menu inferior */
    $( "#btn-toggle" ).on( "click", function() {
        $( ".toggle-nav" ).toggleClass( "toggle-up" );
    });

    $( ".turma-add" ).on( "click", function() {
        localStorage.setItem( "actionConfig", 'criar' );
    });

    $( ".tema-add" ).on( "click", function() {
        localStorage.setItem( "actionConfig", 'criar' );
    });
});