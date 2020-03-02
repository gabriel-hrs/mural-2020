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
            firebase.database().ref().child( "Tokens/Aluno/" + data_token.key ).set( data_token );
        }

        alert(`Novo token de turma criado com sucesso! Código do token:${data_token.key}`);
        
        return sendData();
        // Para enviar os dados preciso retornar a função sendData, mas assim não redireciona a página
        // Caso tente redirecionar antes, a função não é executada pois já está em outra página
        window.location.assign( "turmas.html" );
    });
});