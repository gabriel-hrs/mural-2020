$(document).ready(function() {

    /* Coletar dados do usuário. */
    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;

            /* Pegar imagem do usuário e exibir no avatar de perfil */
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var db = firebase.database();

            var nome_foto = "";

            db.ref( `Usuarios/${uid}/Imagens/Perfil` ).on( "value", function( snapshot ) {
                snapshot.forEach( function( item ) {
                    if( item.val() != "" ) {
                        nome_foto = item.val();
                    }
                    return nome_foto;
                });
                storageRef.child( `${uid}/Perfil/${nome_foto}` ).getDownloadURL().then( function( downloadUrl ) {
                    $( "#top-bar .icon" ).attr( "src", downloadUrl );
                });
            });
        }
    });   
});