$(document).ready(function() {

    /* Botão Switch Toggle do formulário de tema */
    // $("#toggle-check").bootstrapToggle();

    firebase.auth().onAuthStateChanged( function( user ) {
        if ( user ) {
            var uid = user.uid;

            /* Função de cadastro de tema */
            var imagem = $( "#imagem" );
            var nome = $( "#nome-tema" );
            var descricao = $( "#descricao-tema" );
            var referencia = $( ".referencia:checked" );
            var formato = $( "#toggle-check" );

            imagem.change(function(){
                $( ".perfil" ).removeClass("default-photo");
            });

            imagem.on('change',function(e){

                let file = e.target.files[0];
            
                let reader = new FileReader();
                reader.onload = function (element) {
                  $('.btn-circle').css({'background-image':`url('${element.target.result}')`});
                };
                
                reader.readAsDataURL(file);
            
                image = file;
                imageName = file.name;
              });
            
            // $( ".page-title" ).text( `Cadastro ${localStorage.getItem( "userType" )}` ); // Exibir do LocalStorage o tipo de usuário no título da página

            $( ".btn-confirm" ).on( "click", function( novoTema ) {
                novoTema.preventDefault();

                createTema(
                    firebase.auth().currentUser.uid,
                    imagem.val(),
                    nome.val(),
                    descricao.val(),
                    referencia.val(),
                    formato.val()
                );

                createImagesTema(
                    imagem.val()
                );
        
                let setStorage = firebase.storage().ref( `${firebase.auth().currentUser.uid}/Temas/${imageName}` ).put( image ); // Guardar no LocalStorage a foto do usuário
        
                setStorage.on( "state_changed",
                function ProgressEvent( snapshot ) {
                    var porcentagem = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
                    alert(`${porcentagem}%`);
                },
                function error( error ) {
                    alert( error );
                },
                function complete() { 
                    alert( "Upload realizado com sucesso!" );
                    window.location.assign( "temas.html" );
                });

                function createTema( uid, imagem, nome, descricao, referencia, formato ) {
                    let data = {
                        uid: uid,
                        imagem: imagem,
                        nome: nome,
                        descricao: descricao,
                        referencia: referencia,
                        formato: formato
                    };
                    return firebase
                    .database()
                    .ref()
                    .child( "Temas" + nome )
                    .set( data );
                }

                function createImagesTema( imagem ){
                    let data = {
                      imagem: imagem
                    };
                    return firebase
                    .database()
                    .ref()
                    .child( "Usuarios/" + firebase.auth().currentUser.uid + "/Imagens/Temas" )
                    .set( data );
                  }
            });
        }
    });   
});

/* Exibir dados do usuário nessa página */
// import "dados-usuario.js";