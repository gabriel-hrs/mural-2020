$(document).ready(function() {

    /* Coletar dados do usuário. */
    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var db = firebase.database();

            /* Foto de perfil */
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

            /* Loop de turmas */
            firebase.database().ref("Turmas").on("value", function(snapshot) {
                $(".turmas-page .wrapper").html("");

                var turmas = "<ul class='list-group turmas-list'>";
               
                snapshot.forEach(function( turma ) {
                    turmas += "<li class='list-group-item'>";
                    turmas += "<ul class='turma-links'>";
                    turmas += "<li class='action-link'>";
                    turmas += "<img class='icon' src='img/icon-info.svg' alt='Ícone para ver informações da turma'>";
                    turmas += "</li>";
                    turmas += "<li class='action-link'>";
                    turmas += "<img class='icon' src='img/icon-edit-post.svg' alt='Ícone para editar detalhes da turma'>";
                    turmas += "<a href='config-turma.html'>Editar</a>";
                    turmas += "</li>";
                    turmas += "<li class='action-link'>";
                    turmas += "<img class='icon' src='img/icon-delete.svg' alt='Ícone para excluir turma'>";
                    turmas += "<a href='#'>Apagar</a>";
                    turmas += "</li>";
                    turmas += "</ul>";
                    turmas += "<a href='#' class='config-turma'>";
                    turmas += "<img class='icon' src='img/icon-edit.svg' alt='Ícone de configuração da turma'>";
                    turmas += "</a>";
                    turmas += `<span class='turma-school'>${turma.val().escola}</span>`;
                    turmas += `<h2 class='turma-name'>${turma.val().serie}</h2>`;
                    turmas += `<span class="turma-local">${turma.val().cidade}</span>`;
                    turmas += "<a class='star-icon'>";
                    turmas += "<div class='icon' style='mask-image: url(img/icon-star.svg); -webkit-mask-image: url(img/icon-star.svg);' alt='Ícone para favoritar turma'></div>";
                    turmas += "</a>";
                });
                
                turmas += "</ul>";
                $(".turmas-page .wrapper").html(turmas);
            });    
        }

        /* Botão Ver/Editar/Apagar Turma do tipo Toggle */
        $( ".config-turma" ).on( "click" , function() {
            $( this ).siblings().toggleClass( "toggle-left" );
        });
    });    
});

