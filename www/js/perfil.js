$(document).ready(function() {

    /* Coletar dados do usuário. */
    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;            
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var db = firebase.database();

            db.ref( `Usuarios/${uid}` ).on( "value", function( snapshot ) {
                snapshot.forEach( function( item ) {
                    var key = item.key;

                    if( key == 'estado' ) {
                        $("#states").find(".estado").each(function(){
                            if( $(this).val() == item.val() ) {
                                $(this).prop('selected', true);
                            }
                        });
                    } else {
                        $( `.${key}` ).val( item.val() );
                    }
                });
            });

            db.ref( `Usuarios/${uid}/Imagens/Perfil` ).on( "value", function( snapshot ) {
                snapshot.forEach( function( item ) {
                    if( item.val() != "" ) {
                        nome_foto = item.val();
                    }
                    return nome_foto;
                });
                storageRef.child( `${uid}/Perfil/${nome_foto}` ).getDownloadURL().then( function( downloadUrl ) {
                    $( ".icon" ).attr( "src", downloadUrl );
                });
            });
        } 
    });

    /* LOGOUT */
    $( "#logout" ).on( "click" , function( logout ) {
        logout.preventDefault();

        firebase.auth().signOut().then( function() {
            window.location.assign( "index.html" );
        }).catch( function( error ) {
            alert( error );
        });
    });
});