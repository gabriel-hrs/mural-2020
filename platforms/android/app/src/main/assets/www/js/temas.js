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

            /* Loop de temas */
            firebase.database().ref("Temas").on("value", function(snapshot) {
                $(".temas-page .wrapper").html("");

                var temas = "<ul class='list-group temas-list'>";
               
                snapshot.forEach(function( tema ) {
                    temas += "<li class='list-group-item'>";
                    temas += "<a href='#' class='config-tema'>";
                    temas += "<div class='config-icon'>";
                    temas += "<img class='icon' src='img/icon-accept.svg' alt='Ícone para aprovação do registro'>";
                    temas += "</div>";
                    temas += "<div class='perfil btn-circle'>";           
                    temas += `<img class='icon imagem-tema' src='${tema.val().url_imagem}' alt='Imagem definida para o tema'>`;
                    temas += "</div>";
                    temas += `<h2 class="tema-title">${tema.val().nome}</h2>`;
                    temas += `<p class="tema-desc">${tema.val().descricao}</p>`;
                    temas += "</a>";
                    temas += "</li>";
                });
                
                temas += "</ul>";
                $(".temas-page .wrapper").html(temas);
            });      
        }
    });
});