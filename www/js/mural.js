function myFunction() {
    var btn = document.body.getElementByClass("toggle-nav");
    if ( btn.classList.contains("toggle-down") ) {
        btn.classList.add("toggle-up");
        btn.classList.remove("toggle-down");
    } else {
        btn.classList.add("toggle-down");
        btn.classList.remove("toggle-up");
    }
}

$(document).ready(function() {
    // $( "#btn-toggle" ).on( "click", function() {
    //     $( ".toggle-nav" ).toggleClass( "toggle-up" );
    //     $( ".toggle-nav" ).toggleClass( "toggle-down" );
    // });
    // $( "#btn-toggle" ).on( "click", function() {
    //     $( ".toggle-nav" ).removeClass( "toggle-up" );
    // });

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
        }
    });   
});