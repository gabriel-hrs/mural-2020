$(document).ready(function() {
    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;
            var nome = user.nome;
            var email = user.email;
            var foto = user.foto;
            var tipo = user.tipo;
            var estado = user.estado;
            var cidade = user.cidade;

             /* Pegar imagem do usuário e exibir no avatar de perfil */
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var db = firebase.database();

            var nome_foto = "";

            firebase.database().ref( `Usuarios/${uid}` ).on( "value", function( snapshot ) {
                snapshot.forEach( function( item ) {
                    nome_foto = item.val().foto;
                    console.log(nome_foto);
                });
            });
            console.log(uid);
            
            
            storageRef.child( `${uid}/${nome_foto}` ).getDownloadURL().then( function( downloadUrl ) {
                $( "#top-bar .btn-circle .icon" ).html({
                    "src":`url("${downloadUrl}")`
                });
                // alert( downloadUrl );
            });
        } else {
            alert( "Faça o login" );
            window.location.assign( "index.html" );
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

/* Exibir dados do usuário nessa página */
// import "./dados-usuario.js";

// var dadosUsuario = {};
// import { dadosUsuario } from './dados-usuario';
