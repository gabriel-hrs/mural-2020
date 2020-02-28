$(document).ready(function() {

    /* Pegar imagem do usuário e exibir no avatar de perfil */
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var db = firebase.database();
    var uid = firebase.auth().currentUser.uid;

    var nome_foto = '';

    db.ref( 'Usuarios' ).child( uid ).on( 'value', function( snapshot ) {
        snapshot.forEach( function( item ) {
            nome_foto = item.val().foto;
            alert(nome_foto);
        });
    });
    
    storageRef.child( `${uid}/${nome_foto}` ).getDownloadURL().then( function( downloadUrl ) {
        $( '#top-bar .btn-circle' ).css({
            'background-image':`url('${downloadUrl}')`
        });
        alert( downloadUrl );
    });

    /* LOGOUT */
    $( '#logout' ).on( 'click' , function( event ) {
        event.preventDefault();

        firebase.auth().signOut().then( function() {
            window.location.assign( 'index.html' );
        }).catch( function( error ) {
            alert( error );
        });
    });
});

/* Exibir dados do usuário nessa página */
// import 'dados-usuario.js';