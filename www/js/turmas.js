$(document).ready(function() {

    /* Botão Ver/Editar/Apagar Turma do tipo Toggle */
    $( ".toggle-turma" ).on( "click" , function() {
        console.log("SAIU");
        $( this ).siblings().toggleClass( "toggle-left" );
    });

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
                        turmas += `<ul id='${turma.val().escola}' class='turma-links'>`;
                            turmas += "<li class='action-link'>";
                                turmas += "<a href='turma.html' class='ver-turma'><img class='icon' src='img/icon-info.svg' alt='Ícone para ver informações da turma'>";
                                turmas += "Informações</a>";
                            turmas += "</li>";
                            turmas += "<li class='action-link'>";
                                turmas += "<a href='config-turma.html' class='editar-turma'><img class='icon' src='img/icon-edit-post.svg' alt='Ícone para editar detalhes da turma'>";
                                turmas += "Editar</a>";
                            turmas += "</li>";
                            turmas += "<li class='action-link'>";
                                turmas += "<a href='#' class='deletar-turma'><img class='icon' src='img/icon-delete.svg' alt='Ícone para excluir turma'>";
                                turmas += "Apagar</a>";
                            turmas += "</li>";
                        turmas += "</ul>";
                        turmas += "<a href='#' class='toggle-turma'>";
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

            /* Criar variável para armazenar função para editar turma */
            $( ".editar-turma" ).on( "click", function() {
                localStorage.setItem( "actionConfig", 'editar' );
                localStorage.setItem( "turmaInfo", turma.val().escola );
                window.location.assign( "config-turma.html" );
            });

            /* Função para deletar turma */
            $( ".deletar-turma" ).on( "click", function() {
                /* Função */
            });
        }        
    });    
});

