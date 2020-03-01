$(document).ready(function() {

    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;

            /* Função de cadastro de turma */
            var escola = $( "#escola" );
            var periodo = $( ".periodo checked" );
            var serie = $( "#serie" );
            var estado = $( ".estado selected" );
            var cidade = $( "#cidade" );
    
            $( "#escola" ).change(function() {
                alert( $(this).val() );
            });
            
            // $( ".page-title" ).text( `Cadastro ${localStorage.getItem( "userType" )}` ); // Exibir do LocalStorage o tipo de usuário no título da página

            $( ".btn-confirm" ).on( "click", function( novaTurma ) {
                novaTurma.preventDefault();

                createTurma(
                    escola.val(),
                    periodo.val(),
                    serie.val(),
                    estado.val(),
                    cidade.val()
                );

                function createTurma( escola, periodo, serie, estado, cidade ) {
                    let data = {
                        escola: escola,
                        periodo: periodo,
                        serie: serie,
                        estado: estado,
                        cidade: cidade
                    };
                    return firebase
                    .database()
                    .ref()
                    .child( "Turmas/" + escola )
                    .set( data );
                }
            });
        }
    });   
});