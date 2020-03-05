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
                    $( `.${key}` ).val( item.val() );

                    if( key == 'estado' ) {
                        // $('.estado').filter(function() { 
                        //     return ($(this).val() == item.val()); //To select Blue
                        // }).prop('selected', true);
                        // $( `.estado[value='${item.val()}']` ).prop('selected', true);
                        // $(".estado").prop('selected', true);
                        $("#states").val(item.val());
                        console.log(item.val());
                    }
                    // var user = firebase.auth().currentUser;
                    // $(".senha").val( user.getToken() );
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