$(document).ready(function() {

    /* Coletar dados do usuário. */
    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;
            
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var db = firebase.database();

            var nome_foto = "";
            var nome = "";
            var cidade = "cidade";
            var email = "";

            db.ref( `Usuarios/${uid}` ).on( "value", function( snapshot ) {
                snapshot.forEach( function( item ) {
                    if ( item.key = email ) {
                        console.log(item.key);
                        email = item.val();
                        $( "#user-city" ).val( email );
                    } else if ( item.key = 'email' ) {
                        $( "#email" ).val( item.val() );
                    } else if ( item.key = 'estado' ) {
                        $( "#states option" ).val( item.val() );
                    } else if ( item.key = 'nome' ) {
                        $( "#nome" ).val( item.val() );
                    }
                });
            });

            db.ref( `Usuarios/${uid}/Imagens/Perfil` ).on( "value", function( snapshot ) {
                snapshot.forEach( function( item ) {
                    if( item.val() ) {
                        
                        // console.log( nome );
                    }

                    if( item.val() != "" ) {
                        nome_foto = item.val();
                    }
                    return nome_foto;
                });
                storageRef.child( `${uid}/${nome_foto}` ).getDownloadURL().then( function( downloadUrl ) {
                    $( ".icon" ).attr( "src", downloadUrl );
                });
            });
        } else {
            // alert( "Faça o login" );
            // window.location.replace( "index.html" );
        }
    });
});

// if( item.val() = email ) {
//     $( "#email" ).val( item.val() );
//     // $( ".perfil .icon" ).attr( "src", item.val() );
//     console.log(item);
// } else if ( item.val() = nome ) {
//     $( "#user" ).val( item.val() );
//     console.log(item);
// }