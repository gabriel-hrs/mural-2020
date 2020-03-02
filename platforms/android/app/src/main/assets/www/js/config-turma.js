$(document).ready(function() {

    // firebase.auth().onAuthStateChanged( function( user ) {
    //     if ( user ) {
    //         var uid = user.uid;

            /* Função de cadastro de turma */
            var escola = $( "#escola" );
            var periodo = $( "checked.periodo" );
            var serie = $( "#serie" );
            var estado = $( "selected.estado" );
            var cidade = $( "#cidade" );
            
            // $( ".page-title" ).text( `Cadastro ${localStorage.getItem( "userType" )}` ); // Exibir do LocalStorage o tipo de usuário no título da página

            $( ".btn-confirm" ).on( "click", function( novaTurma ) {
                novaTurma.preventDefault();

                createTurma(
                    escola.val(),
                    // periodo.val(),
                    serie.val(),
                    // estado.val(),
                    // cidade.val()
                );

                function createTurma( escola, periodo, serie, estado, cidade ) {
                    let data = {
                        escola: escola,
                        // periodo: periodo,
                        serie: serie,
                        // estado: estado,
                        // cidade: cidade
                    };
                    return firebase
                    .database()
                    .ref()
                    .child( "Turmas/" + escola )
                    .set( data );
                }

                createToken(
                    escola.val(),
                    // periodo.val(),
                    serie.val(),
                    // estado.val(),
                    // cidade.val()
                );

                

                function createToken( escola, periodo, serie, estado, cidade ) {
                    let data = {
                        key: '123456',
                        tipo: 'aluno',
                        escola: escola,
                        // periodo: periodo,
                        serie: serie,
                        // estado: estado,
                        // cidade: cidade
                    };
                    return firebase
                    .database()
                    .ref()
                    .child( "Tokens/Aluno" + firebase.auth().currentUser.uid )
                    .set( data );
                }

                alert(`Novo token de turma criado com sucesso! Código do token:${token}`);
                window.location.assign( "turmas.html" );

            });
        // }
    // });   
});