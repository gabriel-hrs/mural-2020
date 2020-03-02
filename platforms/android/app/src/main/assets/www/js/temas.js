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
                    
        }
    });
});