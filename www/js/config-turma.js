$(document).ready(function() {

    /* Campo do tipo Select2 para Temas da turma */
    

    // $( "#temas-da-turma" ).set( "theme", "bootstrap" );

    firebase.auth().onAuthStateChanged( function( user ) {
        var uid = user.uid;
        var nomeProf = user.nome;
        // var imagemProf = user.Imagens.Perfil.foto_perfil;
        var tipo = user.tipo;
        // var urlProf = user.Imagens.Perfil.url_foto_perfil;

        /* Select de temas */
        firebase.database().ref("Temas").on("value", function(snapshot) {
            let data_temas = [];
            let convertedArray = [];
            snapshot.forEach( function( tema ) {
                data_temas = tema.val().nome;
                convertedArray.push(data_temas);
                data_temas++;
                $( "#temas" ).select2({
                        data: convertedArray,
                        tags: true
                    });
                });
        });

        

        // /* Função de cadastro de turma */ 
        $( ".btn-confirm" ).on( "click", function( novaTurma ) {
            novaTurma.preventDefault();

            let data_turma = {
                escola: $( "#escola" ).val(),
                serie: $( "#serie" ).val(),
                cidade: $( "#cidade" ).val(),
                temas: $( "#temas option:selected" ).val()
            };
        
            let data_token = {
                key: Math.round(Math.random() * 100000000),
                tipo: 'aluno',
                escola: $( "#escola" ).val(),
                serie: $( "#serie" ).val(),
                cidade: $( "#cidade" ).val()
            };

            let data_notificacao = {
                uid: firebase.auth().currentUser.uid,
                imagem: imagemProf,
                url_imagem_prof: urlProf,
                nome_prof: nomeProf,
                nome_turma: $( "#escola" ).val(),
                mensagem: ' postou um novo tema.',
                tipo: tipo,
                data: firebase.database.ServerValue.TIMESTAMP
            };

            function sendData() {
                firebase.database().ref().child( "Notificações/" + data_notificacao.uid ).set( data_notificacao );
                firebase.database().ref().child( "Turmas/" + data_turma.escola ).set( data_turma );
                firebase.database().ref().child( "Tokens/" + data_token.key ).set( data_token ).then( function() {
                    alert(`Novo token de turma criado com sucesso! Código do token:${data_token.key}`);
                    window.location.assign( "turmas.html" );
                });
            }

            return sendData();
        });
    });
});