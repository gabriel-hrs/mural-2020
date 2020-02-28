$(document).ready(function() {

    /*  Tabs de Alunos da turma e Temas da turma */
    $( '#alunos' ).on( 'click', function() {
        $( '.slide-tab' ).toggleClass( 'active' );
        $( '#slide-alunos' ).toggleClass( 'active' );
        $( '#slide-temas' ).toggleClass( 'active' );
    });

    $( '#temas' ).on( 'click', function() {
        $( '.slide-tab' ).toggleClass( 'active' );
        $( '#slide-alunos' ).toggleClass( 'active' );
        $( '#slide-temas' ).toggleClass( 'active' );
    });

    $( '.config-aluno' ).on( 'click', function() {
        $( '.aluno-link' ).toggleClass( 'toggle-left' );
    });
});