$(document).ready(function() {

    /* Coletar dados do usuário. */
    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;
            var tipo = localStorage.getItem("userType");
            var turma = localStorage.getItem("serieTurma");
            console.log(tipo);

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

            db.ref( `Registros/${turma}/${uid}` ).on( "value", function( snapshot ) {
                snapshot.forEach( function( item ) {
                    /* Loop de registros */
                    $(".btn-share").click(function(){
                        localStorage.setItem( "fonteRegistro", item.val().nome );
                    });

                    if (tipo == 'aluno') {
                        $("#reject").css("opacity", "0");
                        $("#accept").css("opacity", "0");
                    }
                });
            });
        }
    });   
});