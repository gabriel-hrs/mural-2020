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
                storageRef.child( `${uid}/${nome_foto}` ).getDownloadURL().then( function( downloadUrl ) {
                    $( "#top-bar .icon" ).attr( "src", downloadUrl );
                });
            });
        } else {
            alert( "Faça o login" );
            window.location.replace( "index.html" );
        }
    });   

    /* LOGOUT */
    $( "#logout" ).on( "click" , function( event ) {
        event.preventDefault();

        firebase.auth().signOut().then( function() {
            window.location.assign( "index.html" );
        }).catch( function( error ) {
            alert( error );
        });
    });
});