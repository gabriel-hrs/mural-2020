$(document).ready(function() {

    /* Coletar dados do usuário. */
    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;
            var tipo = localStorage.getItem("userType");
            var turma = localStorage.getItem("serieTurma");

            /* Pegar imagem do usuário e exibir no avatar de perfil */
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var db = firebase.database();
            var nome_foto = "";

            db.ref( `Usuarios/${firebase.auth().currentUser.uid}/Imagens/Perfil` ).on( "value", function( snapshot ) {
                snapshot.forEach( function( item ) {
                    if( item.val() != "" ) {
                        nome_foto = item.val();
                    }
                    return nome_foto;
                });
                storageRef.child( `${firebase.auth().currentUser.uid}/Perfil/${nome_foto}` ).getDownloadURL().then( function( downloadUrl ) {
                    $( "#top-bar .icon" ).attr( "src", downloadUrl );
                });
            });

            /* Loop de registros */
            db.ref( `Registros/${turma}` ).on( "value", function( item ) {                             
                $(".mural-page .wrapper").html("");

                var registros = "<div class='card registro-card'>";

                item.forEach( function( registro ) {               

                
                    $(".btn-share").click(function(){
                        localStorage.setItem( "fonteRegistro", registro.val().nome );
                    });
                    if (tipo == 'aluno') {
                        $("#reject").css("opacity", "0");
                        $("#accept").css("opacity", "0");
                    }       
                    console.log(registro);

                    registros += "<div class='card-header'>";
                        registros += "<div class='perfil btn-circle default-photo'>";
                            registros += `<img class='icon' src='${registro.val().url_aluno}' alt='Imagem padrão de perfil'>`;
                        registros += "</div>";
                        registros += `<h2 class='name text-bold'>${registro.val().nome_aluno}</h2>`;           
                        registros += `<span class='school'>${registro.val().escola} - ${registro.val().serie}</span>`;
                        registros += "<a href='#' id='reject'>";
                            registros += "<img class='icon' src='img/icon-reject.svg' alt='Ícone para reprovação do registro'>";
                        registros += "</a>";
                        registros += "<a href='#' id='accept'>";
                            registros += "<img class='icon' src='img/icon-accept.svg' alt='Ícone para aprovação do registro'>";
                        registros += "</a>";
                    registros += "</div>";                           
                    registros += "<div class='card-body'>";
                        registros += "<div class='card-content'>";
                            registros += "<div class='card-image'>";
                                registros += `<img src='${registro.val().url}' alt='Imagem do registro'>`;
                                registros += "<div class='registro-fonte'>";
                                    registros += `<span>${registro.val().fonte}</span>`;
                                registros += "</div>";
                            registros += "</div>";
                            registros += "<div class='container registro-options'>";
                                registros += `<span class='btn-circle registro-tema text-bold'>${registro.val().tema}</span>`;
                                registros += "<div class='buttons'>";
                                    registros += "<button class='btn-comment'><img class='icon' src='img/icon-comment.svg' alt='Ícone de balão de comentário'></button>";
                                    registros += "<button class='btn-share'><img class='icon' src='img/icon-share.svg' alt='Ícone de flecha para referência'></button>";
                                registros += "</div>";
                            registros += "</div>";
                            registros += `<p class='container registro-desc'>${registro.val().resumo}</p>`;
                        registros += "</div>";
                    registros += "</div>";
                    registros += "<div class='card-footer'>";
                        registros += "<p class='section-title no-comentary'>Nenhum comentário</p>";
                    registros += "</div>";
                });
                registros += "</div>";
                $(".mural-page .wrapper").html(registros);

            });                
        }
    });   
});