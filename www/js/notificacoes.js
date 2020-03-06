$(document).ready(function() {

    /* Coletar dados do usuário. */
    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var db = firebase.database();
            var tipo = localStorage.getItem( "userType" );

            /* Exibir imagem de perfil. */
            db.ref( `Usuarios/${uid}/Imagens/Perfil` ).on( "value", function( snapshot ) {
                snapshot.forEach( function( item ) {
                    if( item.val() != "" ) {
                        nome_foto = item.val();
                    }
                    return nome_foto;
                });
                storageRef.child( `${uid}/Perfil/${nome_foto}` ).getDownloadURL().then( function( downloadUrl ) {
                    $( ".top-bar .icon" ).attr( "src", downloadUrl );
                });
            });

            $(".notificacao-link").on("click", function(){
                $( this ).addClass("disabled");
            });

            let uidList = getUid();

            if( tipo == "professor" ) {
                var caminho = "Professor";
            } else if( tipo == "aluno" ) {
                var caminho = "Turma";
            }

            /* Loop de notificações */
            firebase.database().ref('Notificações/Professor' ).on("value", function(snapshot) {
                $(".notificacoes-list").html("");

                var notificacoes = "<ul class='list-group temas-list'>";
                
                snapshot.forEach(function( notificacao ) {
                    notificacoes += "<li class='list-group-item'>";
                        notificacoes += "<a class='notificacao-link'>";
                            notificacoes += "<div class='perfil btn-circle'>";
                                notificacoes += `<img class='icon' src='${notificacao.val().url}' alt='Imagem padrão de perfil'>`;
                            notificacoes += "</div>";
                            notificacoes += `<h2 class='action'><span class='name'>${notificacao.val().nome}</span> ${notificacao.val().mensagem}</h2>`;           
                            notificacoes += `<p class='notificacao-extra'>${notificacao.val().tipo}<span> - ${notificacao.val().data}</span></p>`;
                        notificacoes += "</a>";
                    notificacoes += "</li>";
                    
                });
                
                notificacoes += "</ul>";
                $(".notificacoes-list").html(notificacoes);
            });     
        }
    });
});