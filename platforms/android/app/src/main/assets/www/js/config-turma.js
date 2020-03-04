$(document).ready(function() {

    // /* Função de cadastro de turma */ 
    $( ".btn-confirm" ).on( "click", function( novaTurma ) {
        novaTurma.preventDefault();

        let data_turma = {
            escola: $( "#escola" ).val(),
            serie: $( "#serie" ).val(),
            cidade: $( "#cidade" ).val()
        };
    
        let data_token = {
            key: Math.round(Math.random() * 100000000),
            tipo: 'aluno',
            escola: $( "#escola" ).val(),
            serie: $( "#serie" ).val(),
            cidade: $( "#cidade" ).val()
        };

        function sendData() {
            firebase.database().ref().child( "Turmas/" + data_turma.escola ).set( data_turma );
            firebase.database().ref().child( "Tokens/" + data_token.key ).set( data_token ).then( function() {
                alert(`Novo token de turma criado com sucesso! Código do token:${data_token.key}`);
                window.location.assign( "turmas.html" );
            });
        }

        return sendData();
    });
});